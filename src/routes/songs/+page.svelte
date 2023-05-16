<script lang="ts">
  //imports
  import { type SongMetadata, SearchOptions } from '$lib/types.ts';
  import { more_recent_date_string } from '$lib/utils.ts';
  import songs_metadata_ from '$lib/data/songs_metadata.json';
  import SongItem from '$lib/SongItem.svelte';
  import SongSearch from '$lib/SongSearch.svelte';

  //songs metadata
  const songs_metadata: {[song_slug: string]: SongMetadata} = songs_metadata_;

  let sorted_metadata_keys: string[] = Object.keys(songs_metadata);

  let query: string;
  let query_type: SearchOptions;

  $: {
    //.sort() mutates the original array
    if (query_type === SearchOptions.NewestSort) {
      sorted_metadata_keys.sort((a: string, b: string): number => {
        let a_metadata: SongMetadata = songs_metadata[a];
        let b_metadata: SongMetadata = songs_metadata[b];
        //if a more recent than b
        if (more_recent_date_string(a_metadata.release, b_metadata.release)) {
          //a first
          return -1;
        } else {
          return 1;
        }
      });
      sorted_metadata_keys = sorted_metadata_keys;
    } else if (query_type === SearchOptions.OldestSort) {
      sorted_metadata_keys.sort((a: string, b: string): number => {
        let a_metadata: SongMetadata = songs_metadata[a];
        let b_metadata: SongMetadata = songs_metadata[b];
        //if a more recent than b
        if (more_recent_date_string(a_metadata.release, b_metadata.release)) {
          //b first
          return 1;
        } else {
          return -1;
        }
      });
      sorted_metadata_keys = sorted_metadata_keys;
    } else if (query_type === SearchOptions.ShortestSort) {
      sorted_metadata_keys.sort((a: string, b: string): number => {
        let a_metadata: SongMetadata = songs_metadata[a];
        let b_metadata: SongMetadata = songs_metadata[b];
        //if a longer than b
        if (a_metadata.duration > b_metadata.duration) {
          //b first
          return 1;
        } else if (a_metadata.duration < b_metadata.duration) {
          return -1;
        } else {
          return 0;
        }
      });
      sorted_metadata_keys = sorted_metadata_keys;
    } else if (query_type === SearchOptions.LongestSort) {
      sorted_metadata_keys.sort((a: string, b: string): number => {
        let a_metadata: SongMetadata = songs_metadata[a];
        let b_metadata: SongMetadata = songs_metadata[b];
        //if a longer than b
        if (a_metadata.duration > b_metadata.duration) {
          //a first
          return -1;
        } else if (a_metadata.duration < b_metadata.duration) {
          return 1;
        } else {
          return 0;
        }
      });
      sorted_metadata_keys = sorted_metadata_keys;
    } else {
      sorted_metadata_keys = Object.keys(songs_metadata);
    }
  }
</script>

<svelte:head>
  <title>ZTMY Song List</title>
</svelte:head>

<div id="main">
  <div id="header-container">
    <h1>Songs</h1>
  </div>

  <div id="search-container">
    <!-- Search bar for songs -->
    <SongSearch bind:query={query} bind:query_type={query_type}/>
  </div>
  
  <div id="song-list">
    <!--Full, searchable list-->
    {#each sorted_metadata_keys as song_key}
      {@const song_metadata = songs_metadata[song_key]}
      <SongItem {song_metadata} {query} {query_type}/>
    {/each}
  </div>
</div>

<style>
  #header-container {
    text-align: center;
  }

  #main {
    margin: 0px 7vw;
  }

  #song-list {
    display: grid;
    grid-template-columns: auto auto auto;
  }

  #search-container {
    margin-bottom: 20px;
  }

  @media screen and (max-width: 1000px) {
    #song-list {
      grid-template-columns: auto;
    }
  }
</style>
