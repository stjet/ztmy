<script lang="ts">
  //imports
  import { convert_timestamp, deconvert_timestamp, parse_lyrics, lyric_to_html, extract_hiragana, hiragana_to_romaji } from '$lib/utils.ts';
  import type { Lyric } from '$lib/types.ts';

  //exports
  export let lyrics: string | boolean;
  export let current_time: number;
  export let lang: string;
  export let offset: number;

  //parse lyrics
  let parsed_lyrics: Lyric[];
  if (typeof lyrics === "string") {
    parsed_lyrics = parse_lyrics(lyrics);
  }

  //figure out which lyric is the current lyric
  let lyrics_container_ele: HTMLElement;
  let current_index = -1;
  let prev = -1;

  $: {
    let found = false;
    if (parsed_lyrics) {
      for (let i=0; i < parsed_lyrics.length; i++) {
        let i_lyric = parsed_lyrics[i];
        let start = i_lyric.start+offset;
        let end = i_lyric.end+offset;
        if (current_time > start && current_time < end) {
          console.log("found", i)
          found = true;
          current_index = i;
          //scroll into view
          let children = lyrics_container_ele.childNodes;
          for (let j=0; j < children.length; j++) {
            let child = children[j] as HTMLElement;
            if (child.title === `${deconvert_timestamp(convert_timestamp(i_lyric.timestamps[0])+offset)} - ${deconvert_timestamp(convert_timestamp(i_lyric.timestamps[1])+offset)}`) {
              let new_scroll: number = child.offsetTop - Math.round(lyrics_container_ele.clientHeight/2);
              if (new_scroll < 0) {
                new_scroll = 0;
              }
              //only change scroll if there was change
              if (prev !== j) {
                lyrics_container_ele.scrollTop = new_scroll;
                prev = j;
              }
              break;
            }
          }
          break;
        }
      }
      if (!found) {
        current_index = -1;
      }
    }
  }

  //handle masking, once user scrolls past certain point, we change mask
  let mask: string = "linear-gradient(#efefef 35%, #efefef 65%, rgba(255, 255, 255, 0.2))";

  function change_mask(_e: Event) {
    if (lyrics_container_ele.scrollTop < 120) {
      mask = "linear-gradient(#efefef 35%, #efefef 65%, rgba(255, 255, 255, 0.2))";
    } else if (lyrics_container_ele.scrollTop > lyrics_container_ele.scrollHeight-lyrics_container_ele.clientHeight-120) {
      mask = "linear-gradient(rgba(255, 255, 255, 0.2), #efefef 35%, #efefef 65%)";
    } else {
      mask = "linear-gradient(rgba(255, 255, 255, 0.2), #efefef 35%, #efefef 65%, rgba(255, 255, 255, 0.2))";
    }
  }
</script>

<div>
  {#if typeof lyrics === "string"}
    <div id="lyrics-container" bind:this={lyrics_container_ele} on:scroll={change_mask} style:mask>
      {#each parsed_lyrics as lyric, index}
        <p class="{ index == current_index ? 'current-lyric lyric' : 'lyric'}" title="{deconvert_timestamp(convert_timestamp(lyric.timestamps[0])+offset)} - {deconvert_timestamp(convert_timestamp(lyric.timestamps[1])+offset)}">
          {#if lang === "eng"}
            { hiragana_to_romaji(extract_hiragana(lyric.text)) }
          {:else}
            {@html lyric_to_html(lyric.text) }
          {/if}
        </p>
      {/each}
    </div>
  {:else}
    <p>No lyrics available for this concert.</p>
  {/if}
</div>

<style>
  #lyrics-container {
    max-height: 84vh;
    overflow-y: scroll;
    scrollbar-width: none;
  }

  /* hide scrollbar for safari/chromium too */
  #lyrics-container::-webkit-scrollbar {
    display: none;
  }

  #lyrics-container:first-child {
    padding-top: 0vh !important;
  }

  .lyric {
    font-size: 1.2em;
    padding: 0;
    margin-top: 0;
    margin-bottom: 14px;
    word-break: break-all;
  }

  .current-lyric {
    font-weight: bold;
    text-shadow: rgba(255, 255, 255, 0.4) -1px -1px 5px;
  }
</style>
