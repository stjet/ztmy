<script lang="ts">
  //imports
  import { eng_song_to_slug } from '$lib/utils.ts';

  //exports
  export let prev: string;
  export let next: string;
</script>

<div id="control-container">
  <!-- Back/Next Song, Song List -->
  <div id="control-prev">
    <a href="/songs/{eng_song_to_slug(prev)}" rel="external">Previous Song: {prev}</a>
  </div>
  <div id="control-center">
    <a href="/songs">Song List</a>
  </div>
  <div id="control-next">
    <a href="/songs/{eng_song_to_slug(next)}" rel="external">Next Song: {next}</a>
  </div>
</div>

<style>
  #control-container {
    width: 100%;
    box-sizing: border-box;
    padding: 9px 14px;
    display: grid;
    grid-template-columns: auto auto auto;
    border: 1px solid gray;
    border-radius: 10px;
  }

  #control-prev {
    text-align: left;
  }

  #control-next {
    text-align: right;
  }

  #control-center {
    text-align: center;
  }
</style>
