<script lang="ts">
	import { onMount } from "svelte";

  //exports
  export let video_src: string | boolean;
  export let time_jump: number;

  //if timestamp (in seconds) changes, video should jump to that point
  //negative timestamp means ignore, do not jump
  let video_ele: HTMLVideoElement;

  $: {
    if (time_jump >= 0 && video_ele) {
      video_ele.currentTime = time_jump;
    }
  }

  //determine video type if video_src is provided
  let vid_type = "video/mp4";
  $: {
    if (typeof video_src === "string") {
      let split_path = video_src.split("/");
      let file = split_path[split_path.length-1].split(".");
      if (file.length > 1) {
        let extension = file[file.length-1].toLowerCase();
        vid_type = `video/${extension}`;
      }
    }
  }

  //even if video provided, user may want to use their own local video
  function use_own() {
    video_src = false;
  }

  //if video src is not provided, handle user's using local video
  let video_load_ele: HTMLInputElement;
  function load_video() {
    if (video_load_ele.files) {
      video_src = URL.createObjectURL(video_load_ele.files[0]);
    }
  }

  //if browser has input loaded with the video on page load already, load video
  onMount(() => {
    if (video_load_ele.files) {
      if (video_load_ele.files.length > 0) {
        video_src = URL.createObjectURL(video_load_ele.files[0]);
      }
    }
  });
</script>

<div>
  {#if video_src}
    <button id="use-own-button" class="default-button" on:click={use_own}>Use your own video</button>
    <br>
    <video bind:this={video_ele} src="{ video_src }" type="{ vid_type }" controls></video>
  {:else}
    <p>No video provided for this concert. Use your own?</p>
    <input type="file" accept="video/*" bind:this={video_load_ele} on:change={load_video}/>
  {/if}
</div>

<style>
  #use-own-button {
    margin-bottom: 10px;
  }

  video {
    max-width: 100%;
  }
</style>
