<script lang="ts">
  //imports
  import { type SongMetadata, SearchOptions } from '$lib/types.ts';
  import { duration_to_string, eng_song_to_slug } from '$lib/utils.ts';
  
  //exports
  export let song_metadata: SongMetadata;
  export let query: string;
  export let query_type: SearchOptions;

  //handle searches
  let show: boolean = true;

  $: {
    let query_mod = query ? query.trim().toLowerCase() : "";
    if (query_mod === "") {
      show = true;
    } else if (query_type === SearchOptions.AllQuery) {
      if (song_metadata.album.eng.toLowerCase().includes(query_mod) || song_metadata.album.jap.toLowerCase().includes(query_mod) || song_metadata.eng.toLowerCase().includes(query_mod) || song_metadata.jap.toLowerCase().includes(query_mod)) {
        show = true;
      } else {
        show = false;
      }
    } else if (query_type === SearchOptions.TitleQuery) {
      if (song_metadata.eng.toLowerCase().includes(query_mod) || song_metadata.jap.toLowerCase().includes(query_mod)) {
        show = true;
      } else {
        show = false;
      }
    } else if (query_type === SearchOptions.AlbumQuery) {
      if (song_metadata.album.eng.toLowerCase().includes(query_mod) || song_metadata.album.jap.toLowerCase().includes(query_mod)) {
        show = true;
      } else {
        show = false;
      }
    }
  }
</script>


{#if show}
  <div class="song-item-container">
    <h2><a class="song-link" href="/songs/{eng_song_to_slug(song_metadata.eng)}">{song_metadata.jap}</a></h2>
    <h3>{song_metadata.eng}</h3>
    <p>{song_metadata.album.jap} ({song_metadata.album.eng}) - {duration_to_string(song_metadata.duration)} - {song_metadata.release}</p>
  </div>
{/if}

<style>
  .song-item-container {
    padding: 4px;
    margin-bottom: 5px;
  }

  h2 {
    margin-top: 0px;
    margin-bottom: 3px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 1px;
  }

  p {
    margin-top: 5px;
  }

  .song-link {
    text-decoration: none;
  }

  .song-link:hover {
    border-bottom: 1.5px solid #efefef;
  }
</style>
