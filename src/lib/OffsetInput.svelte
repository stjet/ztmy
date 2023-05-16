<script lang="ts">
  //exports
  export let offset: number;
</script>

<div>
  <label for="offset-input">Video Offset: </label>
  <input id="offset-input" placeholder="(in seconds, negative ok)" bind:value={offset} type="number"/>
</div>

<style>
  div {
    padding-top: 10px;
  }
</style>
