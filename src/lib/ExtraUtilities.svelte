<script lang="ts">
  import { add_timestamps } from '$lib/utils.ts';

  let first_time: string;
  let second_time: string;
  let added_time: string = "";

  function add_timestamps_wrapper() {
    added_time = add_timestamps(first_time, second_time);
  }
</script>

<div>
  <h3>Timestamp adding</h3>
  <label for="first-time">First timestamp:</label>
  <input id="first-time" type="text" placeholder="00:00:00" bind:value={first_time}/>
  <br>
  <label for="second-time">Second timestamp:</label>
  <input id="second-item" type="text" placeholder="00:00:00" bind:value={second_time}/>
  <br>
  <button class="default-button" on:click={add_timestamps_wrapper}>Add</button>
  <span>{ added_time }</span>
</div>

<style>
  h3 {
    margin: 0;
  }
</style>
