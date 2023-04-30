<script lang="ts">
  //imports
  import { onMount } from 'svelte';
  import Concert from './Concert.svelte';
  import concerts_metadata from './data/concerts/concerts_metadata.json';
  import type { ConcertMetadata } from '$lib/types.ts';

  //exports
  export let scroll_ele_show;

  //setup concerts array
  let concerts: ConcertMetadata[] = concerts_metadata.concerts;

  //css animation for concert grid and scroll down
  let concert_grid_ele: HTMLElement;

  let played = false;

  function wheel_handle(e: WheelEvent) {
    if (e.deltaY > 0) {
      animate_concert_grid()
    }
  }

  function touchend_handle(e: WheelEvent) {
    animate_concert_grid();
  }

  function animate_concert_grid() {
    if (played) return;
    played = true;
    //hide scroll_ele
    scroll_ele_show = false;
    //animate grid entering
    concert_grid_ele.style.display = "grid";
    concert_grid_ele.animate([
      {
        opacity: 0,
        transform: "translate(0, 10px)"
      },
      {
        opacity: 1,
        transform: "translate(0, 0)"
      }
    ], {
      duration: 100,
      fill: "forwards"
    });
  }

  let hide_some = true;

  function show_more() {
    hide_some = false;
  }
</script>

<svelte:document on:wheel={wheel_handle} on:touchend={touchend_handle}/>

<div id="concert-grid" bind:this={concert_grid_ele}>
  {#each concerts as concert, i}
    <Concert {...concert} show={hide_some ? i < 6 : true}/>
  {/each}
  {#if hide_some}
    <button id="show-more" on:click={show_more}>Show More</button>
  {/if}
</div>

<noscript>
  <style>
    #concert-grid {
      opacity: 1 !important;
      display: grid !important;
    }

    #show-more {
      display: none;
    }
  </style>
</noscript>

<style>
  #concert-grid {
    grid-template-columns: auto auto auto;
    column-gap: 5%;
    opacity: 0;
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
