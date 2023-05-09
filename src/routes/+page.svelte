<svelte:head>
  <title>ZTMY</title>
</svelte:head>

<script lang="ts">
  //imports
  import ConcertsList from '$lib/ConcertsList.svelte';
  import Navbar from '$lib/Navbar.svelte';

  //scroll ele shows by default
  let scroll_ele: HTMLElement;
  let scroll_ele_show: boolean = true;
  $: {
    if (!scroll_ele_show) {
      scroll_ele.style.display = "none";
    }
  }

  //handle scrolling showing the concert list and related
  function wheel_handle(e: WheelEvent) {
    if (e.deltaY > 0) {
      scroll_ele_show = false;
    }
  }

  function touchend_handle(e: WheelEvent) {
    scroll_ele_show = false;
  }
</script>

<svelte:document on:wheel={wheel_handle} on:touchend={touchend_handle}/>

<Navbar {scroll_ele_show}/>

<div class="main-container">
  <div class="title-container">
    <div id="zutomayo-title" aria-label="ZUTOMAYO / ずっと真夜中でいいのに"></div>
    <div id="scroll-down-container" bind:this={scroll_ele}>
      <span>Scroll down</span>
      <br/>
      <span id="scroll-down">&or;</span>
    </div>
  </div>
  <ConcertsList {scroll_ele_show}/>
</div>

<noscript>
  <style>
    #scroll-down-container {
      display: none !important;
    }

    #concert-grid {
      opacity: 1 !important;
      display: grid !important;
    }

    #show-more {
      display: none;
    }

    #nav-bar {
      display: block !important;
    }
  </style>
</noscript>

<style>
  @keyframes slidedown {
    0% {
      transform: translate(0px, 0px);
      opacity: 1;
    }
    20% {
      transform: translate(0px, 0px);
      opacity: 1;
    }
    80% {
      transform: translate(0px, 50px);
      opacity: 0;
    }
    100% {
      transform: translate(0px, 50px);
      opacity: 0;
    }
  }

  .main-container {
    width: 64%;
    margin: auto;
    margin-top: 24vh;
    text-align: center;
  }

  .title-container {
    height: 0px;
    margin-bottom: 150px;
    animation-name: slidedown;
    animation-duration: 3s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  #zutomayo-title {
    font-size: 2.5em;
    margin-bottom: 15px;
  }

  @keyframes changecontent {
    0% {
      content: "ZUTOMAYO";
    }
    24% {
      content: "ZUTOMAYO";
    }
    25% {
      content: "ずっと真夜中でいいのに";
    }
    75% {
      content: "ずっと真夜中でいいのに";
    }
    76% {
      content: "ZUTOMAYO";
    }
    100% {
      content: "ZUTOMAYO";
    }
  }

  #zutomayo-title::after {
    content: "ZUTOMAYO";
    animation-name: changecontent;
    animation-duration: 12s;
    animation-iteration-count: infinite;
  }

  #scroll-down {
    display: inline-block;
    transform: scale(2, 1);
  }

  @media screen and (max-width: 1000px) {
    #zutomayo-title {
      font-size: 2em;
    }

    .main-container {
      width: 76%;
      margin-top: 14vh;
    }
  }
</style>
