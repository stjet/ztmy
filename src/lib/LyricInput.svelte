<script lang="ts">
  //imports
  import { lyric_to_html, normalize_timestamp } from '$lib/utils.ts';

  //exports
  export let add_lyric_callback: (start: string, end: string, lyric: string) => void;

  //actual lyric adding and stuff
  let start_timestamp: string = "";
  let end_timestamp: string = "";
  let lyric: string = "";

  function kanji_detect() {
    //4e00 to 9faf
    const is_kanji = (char) => char.charCodeAt(0) >= 19968 && char.charCodeAt(0) <= 40879;
    let new_lyric: string = "";
    let prev_was_kanji: boolean = false;
    for (const char of lyric.split("")) {
      if (is_kanji(char)) {
        if (!prev_was_kanji) new_lyric += "[";
        prev_was_kanji = true;
      } else {
        if (prev_was_kanji) new_lyric += "]()";
        prev_was_kanji = false;
      }
      new_lyric += char;
    }
    if (prev_was_kanji) new_lyric += "]()";
    lyric = new_lyric;
  }

  function add_lyric() {
    start_timestamp = normalize_timestamp(start_timestamp);
    end_timestamp = normalize_timestamp(end_timestamp);
    if (lyric.length === 0) return;
    let s_t: string = start_timestamp;
    if (!s_t.includes(".")) {
      s_t = s_t+".000"
    }
    let e_t: string = end_timestamp;
    if (!e_t.includes(".")) {
      e_t = e_t+".000"
    }
    let ly: string = lyric_to_html(lyric);
    add_lyric_callback(s_t, e_t, ly);
    //clear the lyric field
    lyric = "";
    start_timestamp = end_timestamp;
  }
</script>

<div>
  <div class="input-container">
    <label for="start">Start Timestamp:</label>
    <input id="start" type="text" bind:value={start_timestamp} placeholder="00:45:14"/>
  </div>
  <div class="input-container">
    <label for="end">End Timestamp:</label>
    <input id="end" type="text" bind:value={end_timestamp} placeholder="00:45:29"/>
  </div>
  <div class="input-container">
    <label for="lyric">Lyric:</label>
    <input id="lyric" type="text" bind:value={lyric} placeholder="[今日](きょう)も[照](て)らし[続](つづ)けるよ"/>
  </div>
  <button class="default-button" on:click={add_lyric}>Add Lyric</button>
  <button class="default-button" on:click={kanji_detect}>Kanji Detect</button>
</div>

<style>
  #lyric {
    min-width: 35vw;
  }

  .input-container {
    padding-bottom: 3px;
  }
</style>
