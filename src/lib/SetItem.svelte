<script lang="ts">
  export let lang: string;
  export let jap: string;
  export let eng: string;
  export let youtube: string | boolean;
  export let song: boolean;
  export let timestamp: string[2];
  //
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
  <p>{ timestamp[0] + "-" + timestamp[1] }</p>
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
</style>
