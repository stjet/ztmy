<script lang="ts">
  export let lyrics: string | boolean;
</script>

<div>
  {#if !lyrics}
    <p>No lyrics available for this concert.</p>
  {/if}
</div>
