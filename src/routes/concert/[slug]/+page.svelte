<script lang="ts">
  //imports
  import { onMount } from 'svelte';
  import SetItem from '$lib/SetItem.svelte';
  import LangToggle from '$lib/LangToggle.svelte';
  import Video from '$lib/Video.svelte';
  import concerts_metadata from '$lib/data/concerts/concerts_metadata.json';
  import type { ConcertInfo } from '$lib/types.ts';
  
  //exports
  export let data;
  //get concert info
  const slug: string = data.slug;
  const concert_info: ConcertInfo = data.concert_info as ConcertInfo;
  const video_src: string | boolean = data.video_src;
  let lang: string = "eng";
  //
  onMount(() => {
    if (navigator.language.toLowerCase().startsWith("ja")) {
      lang = "jap";
    } else if (navigator.language.toLowerCase().startsWith("en")) {
      lang = "eng";
    }
  });
</script>

<div>
  <div id="lang-toggle-container">
    <LangToggle bind:lang={lang}/>
  </div>
  <div id="concert-container">
    <div>
      <h2>Info</h2>
      <h2>Setlist</h2>
      <div id="setlist">
        <ol>
          {#each concert_info.setlist as set_item}
            <li><SetItem {...set_item} {lang}/></li>
          {/each}
        </ol>
      </div>
    </div>
    <div>
      <h2>Video</h2>
      <div>
        <Video {video_src}/>
      </div>
    </div>
    <div>
      <h2>Lyrics</h2>
    </div>
  </div>
</div>

<style>
  #lang-toggle-container {
    float: right;
  }

  #setlist {
    max-height: 80vh;
    overflow-y: scroll;
    scrollbar-color: #A6A6A6 #efefef;
    scrollbar-width: thin;
  }

  #concert-container {
    display: grid;
    grid-template-columns: 25% 50% 15%;
    column-gap: 24px;
  }

  @media screen and (max-width: 1000px) {
    #concert-container {
      grid-template-columns: auto;
    }

    #setlist {
      max-height: 70vh;
    }
  }
</style>
