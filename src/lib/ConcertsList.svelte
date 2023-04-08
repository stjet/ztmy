<script lang="ts">
  import Concert from './Concert.svelte';
  import concerts_metadata from './data/concerts_metadata.json';

  type ConcertInfo = {
    title: string,
    thumbnail_url: string
  };

  let concerts: ConcertInfo[] = concerts_metadata.concerts;
</script>

<div id="concert-grid">
  {#each concerts as concert}
    <Concert {...concert}/>
  {/each}
</div>

<style>
  #concert-grid {
    display: grid;
    grid-template-columns: auto auto auto;
    column-gap: 5%;
  }

  @media screen and (max-width: 1000px) {
    #concert-grid {
      /* one column if on mobile */
      grid-template-columns: auto;
    }
  }
</style>
