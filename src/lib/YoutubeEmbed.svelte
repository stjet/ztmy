<script lang="ts">
  export let youtube: string;
</script>

<div>
  <iframe src="https://www.youtube.com/embed/{ youtube }" title="YouTube video player" frameborder="0" allow="autoplay; clipboard-write; encrypted-media" allowfullscreen></iframe>
</div>

<style>
  iframe {
    width: 730px;
    height: 490px;
  }

  @media screen and (max-width: 900px) {
    iframe {
      width: 330px;
      height: 210px;
      max-width: 95vw;
    }
  }
</style>
