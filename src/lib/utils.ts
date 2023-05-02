import type { Lyric } from '$lib/types.ts';

//convert string timestamp (eg 01:33:24) to seconds
export function convert_timestamp(string_timestamp: string) {
  let hours: number = Number(string_timestamp.split(":")[0]);
  let minutes: number = Number(string_timestamp.split(":")[1]);
  let seconds: number = Number(string_timestamp.split(":")[2]);
  return hours*60*60+minutes*60+seconds;
}

export function lyric_to_html(lyric: string): string {
  let splitted = lyric.split("[");
  //trust me typescript, .shift() will not be undefined
  let ly: string = splitted.shift() as string;
  for (let i=0; i < splitted.length; i++) {
    let kanji_furigana = splitted[i].split(")")[0];
    let kanji = kanji_furigana.split("](")[0];
    let furigana = kanji_furigana.split("](")[1];
    ly += `<ruby>${kanji}<rt>${furigana}</rt></ruby>`;
    let leftover = splitted[i].split(")")[1];
    ly += leftover;
  }
  return ly;
}

export function html_to_lyric(html: string): string {
  return html.replaceAll("<ruby>", "[").replaceAll("<rt>", "](").replaceAll("</rt></ruby>", ")");
}

export function sanitize_lyric(lyric: string): string {
  return lyric.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function parse_lyrics(lyrics: string): Lyric[] {
  let lines = lyrics.split("\n");
  let lyric_objs: Lyric[] = [];
  let timestamps: string[] = [];
  let start: number = 0;
  let end: number = 0;
  for (let i=0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line === "") continue;
    if (i !== 0) {
      if (lines[i-1].trim() === "") {
        //this is the time stamp thing
        timestamps = lines[i].split(" --> ");
        start = convert_timestamp(timestamps[0]);
        end = convert_timestamp(timestamps[1]);
      } else {
        //this is actual lyrics
        let text = sanitize_lyric(html_to_lyric(lines[i]));
        lyric_objs.push({
          timestamps,
          start,
          end,
          text
        });
      }
    }
  }
  return lyric_objs;
}
