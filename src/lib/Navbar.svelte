<script lang="ts">
  //import
  import { animate_down } from '$lib/utils.ts';

  //exports
  export let scroll_ele_show: boolean;

  //handle nav bar show animation on scroll
  let navbar_ele: HTMLElement;

  let played = false;

  $: {
    if (!scroll_ele_show && !played) {
      played = true;
      scroll_ele_show = false;
      animate_down(navbar_ele);
    }
  }
</script>

<div id="nav-bar" bind:this={navbar_ele}>
  <div id="songs-link">
    <a href="/songs">Songs</a>
  </div>
</div>

<style>
  #nav-bar {
    display: none;
    position: relative;
    top: 0;
    box-sizing: border-box;
    padding: 5px;
    width: 100%;
  }

  #songs-link {
    float: right;
    text-align: right;
  }
</style>
