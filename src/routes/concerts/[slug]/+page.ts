import { error } from '@sveltejs/kit';
import concerts_metadata from '$lib/data/concerts/concerts_metadata.json';
import video_config from "$lib/data/video_config.json";
import type { ConcertInfo } from '$lib/types.ts';

const video_srcs: {[slug: string]: string} = video_config.src;

const concerts_info = import.meta.glob('$lib/data/concerts/**/*.json');

export async function load({ params, fetch }) {
  const slug: string = params.slug.toLowerCase();
  let concert_info = concerts_metadata.concerts.find((item) => {
    return slug === item.slug;
  });
  if (!concert_info) {
    throw error(404, "Page Not Found");
  } else {
    const file_key = Object.keys(concerts_info).find((item) => {
      return item.includes(slug) && item.endsWith("info.json");
    });
    if (file_key !== undefined) {
      let concert_info: ConcertInfo = await concerts_info[file_key]() as ConcertInfo;
      let video_src: string | boolean;
      if (Object.keys(video_srcs).includes(slug)) {
        video_src = video_srcs[slug];
        if (video_src.toLowerCase().trim() === "none" || video_src.trim() === "なし") {
          video_src = false;
        }
      } else {
        video_src = false;
      }
      let lyrics_text: string | boolean = false;
      if (typeof concert_info.sub_src === "string") {
        lyrics_text = await (await fetch(`/vtt/${slug}.vtt`)).text();
      }
      return {
        slug: slug,
        concert_info: concert_info,
        video_src: video_src,
        lyrics_text: lyrics_text
      };
    } else {
      throw error(404, "Page Not Found");
    }
  }
}

