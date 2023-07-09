<script lang="ts">
	import { onMount } from 'svelte';

  //exports
  export let video_src: string | boolean;
  export let sub_src: string | boolean;
  export let ytdlp: string | undefined;
  export let time_jump: number;
  export let current_time: number = 0;

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

  //update current video time
  function time_update() {
    current_time = video_ele.currentTime;
  }

  //if browser has input loaded with the video on page load already, load video
  onMount(() => {
    if (video_load_ele?.files) {
      if (video_load_ele.files.length > 0) {
        video_src = URL.createObjectURL(video_load_ele.files[0]);
      }
    }
  });
</script>

<div>
  {#if typeof video_src === "string"}
    <button id="use-own-button" class="default-button" on:click={use_own}>Use your own video</button>
    <br>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video bind:this={video_ele} on:timeupdate={time_update} src="{ video_src }" controls>
      {#if typeof sub_src === "string"}
        <track kind="captions" src={"/"+sub_src} label="Lyrics">
      {/if}
    </video>
  {:else}
    <p>No video provided for this concert (likely due to copyright and/or bandwidth concerns). Use your own?</p>
    {#if ytdlp}
      <p>Video can be downloaded with <a target="_blank" href="https://github.com/yt-dlp/yt-dlp#release-files">yt-dlp</a> from url: <code>{ ytdlp }</code></p>
    {/if}
    <input type="file" accept="video/*" bind:this={video_load_ele} on:change={load_video}/>
  {/if}
</div>

<style>
  code {
    font-family: monospace;
  }

  #use-own-button {
    margin-bottom: 10px;
  }

  video {
    max-width: 100%;
  }
</style>
