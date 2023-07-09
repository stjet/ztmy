<script lang="ts">
  //imports
  import { onMount } from 'svelte';
  import Concert from './Concert.svelte';
  import concerts_metadata from './data/concerts/concerts_metadata.json';
  import { animate_down } from '$lib/utils.ts';
  import type { ConcertMetadata } from '$lib/types.ts';

  //exports
  export let scroll_ele_show: boolean;

  //setup concerts array
  let concerts: ConcertMetadata[] = concerts_metadata.concerts;

  //css animation for concert grid and scroll down
  let concert_grid_ele: HTMLElement;

  let played = false;

  $: {
    if (!scroll_ele_show && !played) {
      played = true;
      scroll_ele_show = false;
      animate_down(concert_grid_ele);
    }
  }

  let hide_some = true;

  function show_more() {
    hide_some = false;
  }
</script>

<div id="concert-grid" bind:this={concert_grid_ele}>
  {#each concerts as concert, i}
    <Concert {...concert} show={hide_some ? i < 6 : true}/>
  {/each}
  {#if hide_some}
    <button id="show-more" on:click={show_more}>Show More</button>
  {/if}
</div>

<style>
  #concert-grid {
    grid-template-columns: auto auto auto;
    column-gap: 5%;
    opacity: 0;
    padding-bottom: 25px;
    display: none;
  }

  #show-more {
    font-size: 1em;
    padding-top: 15px;
    cursor: pointer;
    grid-column-start: 1;
    grid-column-end: 4;
    background-color: transparent;
    border: none;
    color: inherit;
  }

  @media screen and (max-width: 1000px) {
    #concert-grid {
      /* one column if on mobile */
      grid-template-columns: auto;
    }

    #show-more {
      grid-column-start: 1;
      grid-column-end: 2;
    }
  }
</style>
