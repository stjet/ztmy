<script lang="ts">
  //imports
  import { lyric_to_html } from '$lib/utils.ts';

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
</div>

<style>
  #lyric {
    min-width: 35vw;
  }

  .input-container {
    padding-bottom: 3px;
  }
</style>
