<script lang="ts">
  //imports
  import type { SongMetadata, SongInConcert } from '$lib/types.ts';
  import YoutubeEmbed from '$lib/YoutubeEmbed.svelte';
  import SongControl from '$lib/SongControl.svelte';
  import { duration_to_string } from '$lib/utils.ts';

  //exports
  export let data;

  //get song metadata
  const song_metadata: SongMetadata = data.song_metadata;
  const in_concerts: SongInConcert[] = data.in_concerts;

  let next = data.next;
  let prev = data.prev;
</script>

<svelte:head>
  <title>{song_metadata.jap} - ZUTOMAYO</title>
</svelte:head>

<div id="song-grid">
  <div id="info">
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
    <div>
      <h2>Featured in Concerts:</h2>
      {#if in_concerts.length === 0}
          <p>No concerts found</p>
      {:else}
        <ul>
          {#each in_concerts as concert}
            <li><a href="/concerts/{concert.slug}">{concert.title}</a></li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
  <div id="vid">
    {#if song_metadata.mv}
      <h1>Official Music Video</h1>
    {:else}
      <h1>Official Video</h1>
    {/if}
    <!-- Youtube Embed -->
    <YoutubeEmbed youtube={song_metadata.youtube}/>
  </div>
  <div id="bot">
    <SongControl {prev} {next}/>
  </div>
</div>

<style>
  #song-grid {
    display: grid;
    grid-template-columns: 40% 60%;
    grid-template-rows: auto auto;
    padding-left: 10px;
  }

  #album-cover {
    margin-top: 5px;
    width: 150px;
    height: 150px;
  }

  #bot {
    padding: 5px;
    grid-row: 2;
    grid-column: 1 / 3;
  }

  h2 {
    margin: 8px 0px;
  }

  @media screen and (max-width: 900px) {
    #song-grid {
      grid-template-columns: auto;
      grid-template-rows: auto auto auto;
    }

    h2 {
      margin: 6px 0px;
    }
  }

  @media screen and (max-height: 500px), screen and (orientation: portrait) {
    #album-cover {
      width: 135px;
      height: 135px;
    }

    #bot {
      display: none;
    }

    #song-grid {
      grid-template-rows: auto auto;
    }
  }
</style>
