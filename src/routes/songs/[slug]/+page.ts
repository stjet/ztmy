import { error } from '@sveltejs/kit';
import songs_metadata_ from '$lib/data/songs_metadata.json';
import type { SongMetadata } from '$lib/types.ts';

const songs_metadata: {[song_slug: string]: SongMetadata} = songs_metadata_;

export async function load({ params }) {
  const slug: string = params.slug.toLowerCase();
  if (!songs_metadata[slug]) {
    throw error(404, "Page Not Found");
  } else {
    //return song metadata and what concerts it is in
    //
    return {
      slug: slug,
      song_metadata: songs_metadata[slug],
    }
  }
};
