import { error } from '@sveltejs/kit';
import { eng_song_to_slug } from '$lib/utils.ts';
import songs_metadata_ from '$lib/data/songs_metadata.json';
import type { SongMetadata, ConcertInfo, SetItem, SongInConcert } from '$lib/types.ts';

const songs_metadata: {[song_slug: string]: SongMetadata} = songs_metadata_;

const concerts_info = import.meta.glob('$lib/data/concerts/**/*.json');

export async function load({ params }) {
  const slug: string = params.slug.toLowerCase();
  if (!songs_metadata[slug]) {
    throw error(404, "Page Not Found");
  } else {
    //find what concerts song is in
    let in_concerts: SongInConcert[] = [];
    for (let i=0; i < Object.values(concerts_info).length; i++) {
      let concert_info: ConcertInfo = await Object.values(concerts_info)[i]() as ConcertInfo;
      if (!concert_info.setlist) {
        //this is concerts_metadata.json
        continue;
      }
      for (let j=0; j < concert_info.setlist.length; j++) {
        let setitem: SetItem = concert_info.setlist[j];
        if (slug === eng_song_to_slug(setitem.eng)) {
          in_concerts.push({
            title: concert_info.title,
            slug: concert_info.slug,
            timestamp: setitem.timestamp
          });
        }
      }
    }
    //find index and next and prev song
    let index = Object.keys(songs_metadata).findIndex((item) => {
      return item === slug;
    });
    let songs_values = Object.values(songs_metadata);
    let prev;
    if (index-1 < 0) {
      prev = songs_values[songs_values.length-1].eng;
    } else {
      prev = songs_values[index-1].eng;
    }
    let next;
    if (index+1 >= songs_values.length) {
      next = songs_values[0].eng;
    } else {
      next = songs_values[index+1].eng;
    }
    //return song metadata and what concerts it is in
    return {
      slug,
      in_concerts,
      song_metadata: songs_metadata[slug],
      next,
      prev,
    }
  }
};
