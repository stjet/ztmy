<script lang="ts">
  //exports
  export let lang: string;
  export let jap: string;
  export let eng: string;
  export let youtube: string | boolean;
  export let song: boolean;
  export let timestamp: string[2];
  export let time_jump: number;

  //change video seconds if timestamp clicked
  function change_timestamp(event: MouseEvent) {
    let clicked_timestamp = (event.target as HTMLElement).innerText;
    //convert string timestamp (eg 01:33:24) to seconds
    let hours: number = Number(clicked_timestamp.split(":")[0]);
    let minutes: number = Number(clicked_timestamp.split(":")[1]);
    let seconds: number = Number(clicked_timestamp.split(":")[2]);
    time_jump = hours*60*60+minutes*60+seconds;
  }
</script>

<div>
  <h3>
    {#if lang == "jap"}{ jap }{:else}{ eng }{/if}
    {#if song}
      {#if typeof youtube == "string"}
        <span class="is-song"><a href={youtube}>{#if lang == "jap"}歌{:else}Song{/if}</a></span>
      {:else}
        <span class="is-song">{#if lang == "jap"}歌{:else}Song{/if}</span>
      {/if}
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
    color: #312f33;
    border-radius: 5px;
  }

  .is-song a {
    color: #312f33;
    cursor: pointer;
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
</style>
