<script lang="ts">
  //imports
  import type { SongMetadata } from '$lib/types.ts';
  import YoutubeEmbed from '$lib/YoutubeEmbed.svelte';
  import { duration_to_string } from '$lib/utils.ts';

  //exports
  export let data;

  //get song metadata
  const song_metadata: SongMetadata = data.song_metadata;
</script>

<svelte:head>
  <title>{song_metadata.jap} - ZUTOMAYO</title>
</svelte:head>

<div id="song-grid">
  <div>
    <!-- Album/song info -->
    <h1>Song Info</h1>
    <b>Name: {song_metadata.jap} ({song_metadata.eng})</b>
    <br>
    <span>Release Date: {song_metadata.release}</span>
    <br>
    <span>Duration: {duration_to_string(song_metadata.duration)}</span>
    <br>
    <span>Lyrics Credit: {song_metadata.lyrics}</span>
    <br>
    <span>Arrangement Credit: {song_metadata.arrangement}</span>
    <h2>Album Info</h2>
    <span>Album Name: {song_metadata.album.jap} ({song_metadata.album.eng})</span>
    <br>
    <img id="album-cover" alt="Album Cover" src="{song_metadata.album.image}"/>
  </div>
  <div>
    {#if song_metadata.mv}
      <h1>Official Music Video</h1>
    {:else}
      <h1>Official Video</h1>
    {/if}
    <!-- Youtube Embed -->
    <YoutubeEmbed youtube={song_metadata.youtube}/>
  </div>
  <div>
    <!-- Back/Next Song, Song List -->
  </div>
</div>

<style>
  #song-grid {
    display: grid;
    grid-template-columns: 40% 60%;
    grid-template-rows: 84vh 12vh;
  }

  #album-cover {
    margin-top: 5px;
    width: 155px;
    height: 155px;
  }

  @media screen and (max-width: 1000px) {
    #song-grid {
      grid-template-columns: auto;
      grid-template-rows: auto auto auto;
    }
  }
</style>
