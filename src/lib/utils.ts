import type { Lyric } from '$lib/types.ts';

export function animate_down(ele: HTMLElement) {
  //animate grid entering
  ele.style.display = "grid";
  ele.animate([
    {
      opacity: 0,
      transform: "translate(0, 10px)"
    },
    {
      opacity: 1,
      transform: "translate(0, 0)"
    }
  ], {
    duration: 100,
    fill: "forwards"
  });
}

//convert string timestamp (eg 01:33:24) to seconds
export function convert_timestamp(string_timestamp: string) {
  let hours: number = Number(string_timestamp.split(":")[0]);
  let minutes: number = Number(string_timestamp.split(":")[1]);
  let seconds: number = Number(string_timestamp.split(":")[2]);
  return hours*60*60+minutes*60+seconds;
}

//number timestamp to string timestamp
export function deconvert_timestamp(timestamp: number) {
  if (timestamp < 0) {
    return "00:00:00";
  }
  let hours: string = String(Math.floor(timestamp/(60*60)));
  hours = hours.length >= 2 ? hours : "0"+hours;
  let minutes: string = String(Math.floor((timestamp%(60*60))/60));
  minutes = minutes.length == 2 ? minutes : "0"+minutes;
  let seconds: string = String(timestamp%60);
  if (seconds.includes(".")) {
    //is decimal
    if (seconds.split(".")[0].length === 1) {
      seconds = "0"+seconds;
    }
    seconds = seconds.split(".")[0]+"."+seconds.split(".")[1][0]+"00";
  } else {
    seconds = seconds.length == 2 ? seconds : "0"+seconds;
  }
  return `${hours}:${minutes}:${seconds}`;
}

export function lyric_to_html(lyric: string): string {
  let splitted: string[] = lyric.split(/[[｛]/g);
  //trust me typescript, .shift() will not be undefined
  let ly: string = splitted.shift() as string;
  for (let i=0; i < splitted.length; i++) {
    let kanji_furigana: string = splitted[i].split(/[)）]/g)[0].split(/[\]｝][(（]/g);
    let kanji: string = kanji_furigana[0];
    let furigana: string = kanji_furigana[1];
    ly += `<ruby>${kanji}<rt>${furigana}</rt></ruby>`;
    let leftover: string = splitted[i].split(/[)）]/g)[1];
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
  let lines: string[] = lyrics.split("\n");
  let lyric_objs: Lyric[] = [];
  let timestamps: string[] = [];
  let start: number = 0;
  let end: number = 0;
  for (let i=0; i < lines.length; i++) {
    let line: string = lines[i].trim();
    if (line === "") continue;
    if (i !== 0) {
      if (lines[i-1].trim() === "") {
        //this is the time stamp thing
        timestamps = lines[i].split(" --> ");
        start = convert_timestamp(timestamps[0]);
        end = convert_timestamp(timestamps[1]);
      } else {
        //this is actual lyrics
        let text: string = sanitize_lyric(html_to_lyric(lines[i]));
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

export function extract_hiragana(lyric: string): string {
  //remove kanji
  let splitted: string[] = lyric.split("[");
  let hiragana: string = splitted.shift() as string;
  for (let i=0; i < splitted.length; i++) {
    hiragana += splitted[i].split("]")[1].replace("(", "").replace(")", "");
  }
  return hiragana;
}

function katakana_to_hiragana(mixed: string): string {
  //convert katakana to hiragana
  let kata_to_hira: {[char: string]: string} = {
    "ア": "あ",
    "イ": "い",
    "ウ": "う",
    "エ": "え",
    "オ": "お",
    "カ": "か",
    "キ": "き",
    "ク": "く",
    "ケ": "け",
    "コ": "こ",
    "サ": "さ",
    "シ": "し",
    "ス": "す",
    "セ": "せ",
    "ソ": "そ",
    "タ": "た",
    "チ": "ち",
    "ツ": "つ",
    "テ": "て",
    "ト": "と",
    "ナ": "な",
    "ニ": "に",
    "ヌ": "ぬ",
    "ネ": "に",
    "ノ": "の",
    "ハ": "は",
    "ヒ": "ひ",
    "フ": "ふ",
    "ヘ": "へ",
    "ホ": "ほ",
    "マ": "ま",
    "ミ": "み",
    "ム": "む",
    "メ": "め",
    "モ": "も",
    "ヤ": "や",
    "ユ": "ゆ",
    "ヨ": "よ",
    "ラ": "ら",
    "リ": "り",
    "ル": "る",
    "レ": "れ",
    "ロ": "ろ",
    "ワ": "わ",
    "ヲ": "を",
    "ン": "ん",
    "ヴ": "ゔ",
    "ガ": "が",
    "ギ": "ぎ",
    "グ": "ぐ",
    "ゲ": "げ",
    "ゴ": "ご",
    "ザ": "ざ",
    "ジ": "じ",
    "ズ": "ず",
    "ゼ": "ぜ",
    "ゾ": "ぞ",
    "ダ": "だ",
    "ヂ": "ぢ",
    "ヅ": "づ",
    "デ": "で",
    "ド": "ど",
    "バ": "ば",
    "ビ": "び",
    "ブ": "ぶ",
    "ベ": "べ",
    "ボ": "ぼ",
    "パ": "ぱ",
    "ピ": "ぴ",
    "プ": "ぷ",
    "ペ": "ぺ",
    "ポ": "ぽ",
    "ァ": "ぁ",
    "ィ": "ぃ",
    "ゥ": "ぅ",
    "ェ": "ぇ",
    "ォ": "ぉ",
    "ャ": "ゃ",
    "ュ": "ゅ",
    "ョ": "ょ",
    "ッ": "っ"
  };
  let new_text = "";
  for (let i=0; i < mixed.length; i++) {
    let char: string = mixed[i];
    if (Object.keys(kata_to_hira).includes(char)) {
      new_text += kata_to_hira[char];
    } else {
      new_text += char;
    }
  }
  return new_text;
}

export function hiragana_to_romaji(hiragana: string): string {
  //convert katakana to hiragana
  hiragana = katakana_to_hiragana(hiragana);
  //convert hiragana string to romaji
  //hepburn/wapuro table
  const conversions: {[chars: string]: string} = {
    "あ": "a",
    "い": "i",
    "う": "u",
    "え": "e",
    "お": "o",
    "か": "ka",
    "き": "ki",
    "く": "ku",
    "け": "ke",
    "こ": "ko",
    "さ": "sa",
    "し": "shi",
    "す": "su",
    "せ": "se",
    "そ": "so",
    "た": "ta",
    "ち": "chi",
    "つ": "tsu",
    "て": "te",
    "と": "to",
    "な": "na",
    "に": "ni",
    "ぬ": "nu",
    "ね": "ne",
    "の": "no",
    "は": "ha",
    "ひ": "hi",
    "ふ": "fu",
    "へ": "he",
    "ほ": "ho",
    "ま": "ma",
    "み": "mi",
    "む": "mu",
    "め": "me",
    "も": "mo",
    "や": "ya",
    "ゆ": "yu",
    "よ": "yo",
    "ら": "ra",
    "り": "ri",
    "る": "ru",
    "れ": "re",
    "ろ": "ro",
    "わ": "wa",
    "を": "wo",
    "ん": "nn",
    "ゔ": "vu",
    "が": "ga",
    "ぎ": "gi",
    "ぐ": "gu",
    "げ": "ge",
    "ご": "go",
    "ざ": "za",
    "じ": "ji",
    "ず": "zu",
    "ぜ": "ze",
    "ぞ": "zo",
    "だ": "da",
    "ぢ": "di",
    "づ": "du",
    "で": "de",
    "ど": "do",
    "ば": "ba",
    "び": "bi",
    "ぶ": "bu",
    "べ": "be",
    "ぼ": "bo",
    "ぱ": "pa",
    "ぴ": "pi",
    "ぷ": "pu",
    "ぺ": "pe",
    "ぽ": "po",
    "ぁ": "a",
    "ぃ": "i",
    "ぅ": "u",
    "ぇ": "e",
    "ぉ": "o"
  };
  let special_small: string[] = ["ゃ", "ゅ", "ょ", "っ"];
  //actual converting
  let romaji = "";
  for (let i=0; i < hiragana.length; i++) {
    let h = hiragana[i];
    if (Object.keys(conversions).includes(h)) {
      romaji += conversions[h];
    } else if (special_small.includes(h)) {
      if (Object.keys(conversions).includes(hiragana[i-1]) && (h === "ゃ" || h === "ゅ" || h === "ょ")) {
        romaji = romaji.slice(0, -1);
      }
      if (h === "ゃ") {
        romaji += "ya";
      } else if (h === "ゅ") {
        romaji += "yu";
      } else if (h === "ょ") {
        romaji += "yo";
      } else if (h === "っ") {
        if (Object.keys(conversions).includes(hiragana[i+1])) {
          romaji += conversions[hiragana[i+1]][0];
        }
      }
    } else {
      //nothing to convert just add it
      if (h !== "ー") {
        romaji += h;
      }
    }
  }
  return romaji;
}

export function eng_song_to_slug(eng_song: string): string {
  if (eng_song.includes("(")) {
    //anything in parenthesis is not part of song name
    eng_song = eng_song.split("(")[0];
  }
  eng_song = eng_song.toLowerCase().trim();
  const strip_chars = ["「", "」", "'"];
  for (let i=0; i < strip_chars.length; i++) {
    eng_song = eng_song.replaceAll(strip_chars[i], "");
  }
  return eng_song.replaceAll(" ", "-");
}

export function duration_to_string(duration: number): string {
  return String(Math.floor(duration/60)) + ":" + (String(duration%60).length === 2 ? String(duration%60) : "0"+String(duration%60));
}

//returns true if date1 is more recent, false otherwise
export function more_recent_date_string(date1: string, date2: string): boolean {
  date1 = date1.replace("?", "");
  date2 = date2.replace("?", "");
  let year1 = Number(date1.split("/")[0]);
  let year2 = Number(date2.split("/")[0]);
  if (year1 > year2) {
    return true;
  } else if (year1 < year2) {
    return false;
  }
  let month1 = Number(date1.split("/")[1]);
  let month2 = Number(date2.split("/")[1]);
  if (month1 > month2) {
    return true;
  } else if (month1 < month2) {
    return false;
  }
  let day1 = Number(date1.split("/")[2]);
  let day2 = Number(date2.split("/")[2]);
  if (day1 > day2) {
    return true;
  } else {
    return false;
  }
}

//in format of 00:00:00
export function add_timestamps(time1: string, time2: string): string {
  let carry_minute: number = 0;
  let seconds: number = Number(time1.split(":")[2])+Number(time2.split(":")[2]);
  if (seconds >= 60) {
    seconds = seconds - 60;
    carry_minute++;
  }
  let carry_hour: number = 0;
  let minutes: number = Number(time1.split(":")[1])+Number(time2.split(":")[1])+carry_minute;
  if (minutes >= 60) {
    minutes = minutes - 60;
    carry_hour++;
  }
  let hours: number = Number(time1.split(":")[0])+Number(time2.split(":")[0])+carry_hour;
  return `${String(hours).length === 1 ? `0${hours}` : hours}:${String(minutes).length === 1 ? `0${minutes}` : minutes}:${String(seconds).length === 1 ? `0${seconds}` : seconds}`;
}

export function normalize_timestamp(weird_string: string): string {
  const fullwidth_numbers_to_regular: {[fullwidth: string]: string} = {
    "０": "0",
    "１": "1",
    "２": "2",
    "３": "3",
    "４": "4",
    "５": "5",
    "６": "6",
    "７": "7",
    "８": "8",
    "９": "9",
    "：": ":",
  };
  for (let f of Object.keys(fullwidth_numbers_to_regular)) {
    weird_string = weird_string.replaceAll(f, fullwidth_numbers_to_regular[f]);
  }
  return weird_string;
}
