<script lang="ts">
  //imports
  import { onMount } from 'svelte';
  import Video from '$lib/Video.svelte';
  import LyricInput from '$lib/LyricInput.svelte';
  import { convert_timestamp } from '$lib/utils.ts';

  //manage playing video alongside with example subtitles
  let current_time: number = 0;
  let time_jump: number = 0;
  let given_time: string;

  //actual subtitle file
  let subtitles: string = "WEBVTT";
  let sub_src: string | boolean = false;

  $: {
    sub_src = URL.createObjectURL(new Blob([subtitles]));
    console.log(sub_src)
  }

  function jump_to() {
    if (given_time) {
      time_jump = convert_timestamp(given_time)
    }
  }

  function add_lyric_callback(start: string, end: string, lyric: string) {
    //todo: don't automatically add to end, add based on timestamp
    subtitles += `\n\n${start} --> ${end}\n${lyric}`;
    console.log(subtitles)
  }

  let textarea: HTMLTextAreaElement;

  function toggle_editing(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      textarea.disabled = false;
    } else {
      textarea.disabled = true;
    }
  }

  onMount(() => {
    function copy_file() {
      let textarea: HTMLInputElement = document.getElementById("subtitles") as HTMLInputElement;
      textarea.select();
      textarea.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(textarea.value);
    }

    document.getElementById("copy-button")?.addEventListener("click", copy_file);

    function download_file() {
      let textarea: HTMLInputElement = document.getElementById("subtitles") as HTMLInputElement;
      let download: HTMLAnchorElement = document.createElement("A") as HTMLAnchorElement;
      download.download = prompt("File name?", "example")+".vtt";
      download.href = URL.createObjectURL(new Blob([textarea.value]));
      download.click();
    }

    document.getElementById("download-button")?.addEventListener("click", download_file);

    //if browser checks the checkbox by default, probably because it remembers previous state
    if ((document.getElementById("manual-editing") as HTMLInputElement)?.checked) {
      textarea.disabled = false;
    }
  });
</script>

<svelte:head>
  <title>Subtitle Creator</title>
</svelte:head>

<h1>Subtitle Creator</h1>
<div>
  <p>
    Instructions:
    Enter in start and end timestamp, then put in the Japanese lyrics.
    If any kanji, put that in brackets, and put the hiragana furigana after the kanji in parenthesis.
    Eg: "[水曜日](すいようび)は[明日](あした)"
    The site can automatically handle Japanese to romaji conversion, so do not worry about that.
    Once you are done, you can either copy the generated <code>.vtt</code> file text, or download the <code>.vtt</code> file.
    Optionally, you can turn on manual editing, paste in the contents of a <code>.vtt</code> file and add to it.
  </p>
  <div id="creation-container">
    <div>
      <LyricInput {add_lyric_callback}/>
      <br>
      <input id="manual-editing" on:change={toggle_editing} type="checkbox"/><label for="manual-editing">Manual Editing</label>
      <br>
      <textarea bind:this={textarea} bind:value={subtitles} id="subtitles" disabled></textarea>
      <br>
      <button class="default-button" id="copy-button">Copy</button><button class="default-button" id="download-button">Download</button>
    </div>
    <div>
      <input bind:value={given_time} type="text" placeholder="01:12:42"/>
      <button class="default-button" on:click={jump_to}>Jump To</button>
      <br>
      <Video video_src={false} {sub_src} {time_jump} bind:current_time={current_time} ytdlp={undefined}></Video>
    </div>
  </div>
</div>

<style>
  textarea {
    height: 25vh;
    min-height: 120px;
    min-width: 40vw;
  }

  #creation-container {
    display: grid;
    grid-template-columns: auto auto;
  }

  :global(.default-button) {
    padding-left: 0;
  }

  input[type="checkbox"] {
    margin-left: 0;
  }

  @media screen and (max-width: 1000px) {
    #creation-container {
      grid-template-columns: auto;
    }
    textarea {
      min-width: 70vw;
    }
  }
</style>
