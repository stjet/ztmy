<script lang="ts">
  //imports
  import { convert_timestamp, deconvert_timestamp, eng_song_to_slug } from '$lib/utils.ts';

  //exports
  export let lang: string;
  export let jap: string;
  export let eng: string;
  export let youtube: string | boolean;
  export let song: boolean;
  export let timestamp: string[]; //string[2]
  export let current_time: number;
  export let time_jump: number;
  export let offset: number;

  let current_song = false;

  let og_timestamp = timestamp;

  $: {
    if (offset !== 0) {
      //timestamps are in seconds
      timestamp = [deconvert_timestamp(convert_timestamp(og_timestamp[0])+offset), deconvert_timestamp(convert_timestamp(og_timestamp[1])+offset)];
    }
  }

  //change video seconds if timestamp clicked
  function change_timestamp(event: MouseEvent) {
    let clicked_timestamp = (event.target as HTMLElement).innerText;
    time_jump = convert_timestamp(clicked_timestamp);
  }

  $: {
    let start = convert_timestamp(timestamp[0]);
    let end = convert_timestamp(timestamp[1]);
    if (start <= Math.round(current_time) && Math.round(current_time) <= end) {
      current_song = true;
    } else {
      current_song = false;
    }
  }
</script>

<div class="{ current_song ? 'current-song setitem-container' : 'setitem-container' }">
  <h3>
    {#if typeof youtube == "string"}
      <a href="{youtube}" target="_blank" rel="noreferrer noopener">{#if lang == "jap"}{ jap }{:else}{ eng }{/if}</a>
    {:else}
      {#if lang == "jap"}{ jap }{:else}{ eng }{/if}
    {/if}
    {#if song}
      <a class="is-song" href="/songs/{eng_song_to_slug(eng)}">{#if lang == "jap"}歌{:else}Song{/if}</a>
    {/if}
  </h3>
  <p>
    <button class="vid-timestamp" on:click={change_timestamp}>{ timestamp[0] }</button>
    -
    <button class="vid-timestamp" on:click={change_timestamp}>{ timestamp[1] }</button>
  </p>
</div>

<style>
  h3 {
    margin-top: 0px;
    margin-bottom: 0;
  }

  p {
    margin-top: 0;
    margin-bottom: 9px;
  }

  .is-song {
    font-size: 0.6em;
    margin-bottom: 0.2em;
    padding: 3px;
    background-color: #efefef;
    color: #312f33 !important;
    text-decoration: none;
    border-radius: 5px;
  }

  .vid-timestamp {
    padding: 0;
    margin: 0;
    background-color: transparent;
    border: none;
  }

  .vid-timestamp:hover {
    cursor: pointer;
    color: #FCFCFC;
  }

  div.setitem-container {
    padding: 1px 5px;
    border-radius: 6px;
  }

  /* wrap in :is() so our dumb tooling thing doesn't remove it for being unused */
  :is(.current-song) {
    background-color: rgba(35, 20, 150, 0.25);
    box-shadow: 1px 1px 10px purple;
  }
</style>
