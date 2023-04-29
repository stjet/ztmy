<script lang="ts">
  //imports
  import Video from '$lib/Video.svelte';

  //manage playing video alongside with example subtitles
  let current_time: number = 0;
  let time_jump: number = 0;

  //actual subtitle file
  let subtitles: string = "";
</script>

<!-- Tools for making subs (including furigana with <ruby>  -->
<!-- Options: add to existing file (have them upload the existing file) or create new, standalone file -->
<!-- See VTT file along with video -->

<h1>Subtitle Creator</h1>
<div>
  <p>
    Instructions:
    Enter in start and end timestamp, then put in the Japanese lyrics.
    If any kanji, put the hiragana furigana after the kanji in parenthesis.
    Eg: "水曜日（すいようび）は明日（あした）"
    The site can automatically handle Japanese to romaji conversion, so do not worry about that.
    Once you are done, you can either copy the generated <code>.vtt</code> file text, or download the <code>.vtt</code> file.
    Optionally, you can upload an existing <code>.vtt</code> file and add to it.
  </p>
  <div>
    <div>
      <label for="start">Start Timestamp:</label>
      <input id="start" type="text"/>
      <br>
      <label for="end">End Timestamp:</label>
      <input id="end" type="text"/>
      <br>
      <label for="lyric">Lyric:</label>
      <input id="lyric" type="text"/>
      <br>
      <button class="default-button">Add Lyric</button>
      <br>
      <textarea disabled>{subtitles}</textarea>
      <br>
      <button class="default-button">Copy</button><button class="default-button">Download</button>
    </div>
    <div>
      <Video video_src={false} {time_jump} bind:current_time={current_time}></Video>
    </div>
  </div>
</div>
