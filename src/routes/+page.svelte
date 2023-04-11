<svelte:head>
  <title>ZTMY</title>
</svelte:head>

<script lang="ts">
  import ConcertsList from '../lib/ConcertsList.svelte';
</script>

<div class="main-container">
  <div class="title-container">
    <div id="zutomayo-title" aria-label="ZUTOMAYO / ずっと真夜中でいいのに"></div>
  </div>
  <ConcertsList/>
</div>

<style>
  .main-container {
    width: 62%;
    margin: auto;
    margin-top: 24vh;
    text-align: center;
  }

  .title-container {
    height: 0px;
    margin-bottom: 150px;
  }

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

  #zutomayo-title {
    font-size: 2.5em;
    animation-name: slidedown;
    animation-duration: 3s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
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
