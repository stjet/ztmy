<script lang="ts">
  //imports
  import { onMount } from 'svelte';
  import Concert from './Concert.svelte';
  import concerts_metadata from './data/concerts_metadata.json';

  //exports
  export let scroll_ele_show;

  //setup concerts array
  type ConcertInfo = {
    title: string,
    slug: string,
    subtitle: string,
    thumbnail_url: string
  };

  let concerts: ConcertInfo[] = concerts_metadata.concerts;

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

</script>

<svelte:document on:wheel={wheel_handle} on:touchend={touchend_handle}/>

<div id="concert-grid" bind:this={concert_grid_ele}>
  {#each concerts as concert}
    <Concert {...concert}/>
  {/each}
</div>

<noscript>
  <style>
    #concert-grid {
      opacity: 1 !important;
      display: grid !important;
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

  @media screen and (max-width: 1000px) {
    #concert-grid {
      /* one column if on mobile */
      grid-template-columns: auto;
    }
  }
</style>
