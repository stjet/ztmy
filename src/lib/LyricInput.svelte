<script lang="ts">
  //exports
  export let add_lyric_callback: (start: string, end: string, lyric: string) => void;

  //actual lyric adding and stuff
  let start_timestamp: string = "";
  let end_timestamp: string = "";
  let lyric: string = "";

  function add_lyric() {
    console.log(lyric)
    if (lyric.length === 0) return;
    let s_t: string = start_timestamp;
    if (!s_t.includes(".")) {
      s_t = s_t+".000"
    }
    let e_t: string = end_timestamp;
    if (!e_t.includes(".")) {
      e_t = e_t+".000"
    }
    let splitted = lyric.split("[");
    //trust me typescript, .shift() will not be undefined
    let ly: string = splitted.shift() as string;
    for (let i=0; i < splitted.length; i++) {
      let kanji_furigana = splitted[i].split(")")[0];
      let kanji = kanji_furigana.split("](")[0];
      let furigana = kanji_furigana.split("](")[1];
      ly += `<ruby>${kanji}<rt>${furigana}</rt></ruby>`;
      let leftover = splitted[i].split(")")[1];
      ly += leftover;
    }
    add_lyric_callback(s_t, e_t, ly);
    //clear the lyric field
    lyric = "";
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
</div>

<style>
  #lyric {
    min-width: 35vw;
  }

  .input-container {
    padding-bottom: 3px;
  }
</style>
