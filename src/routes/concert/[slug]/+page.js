import { error } from '@sveltejs/kit';
import concerts_metadata from '$lib/data/concerts_metadata.json';

export function load({ params }) {
  let concert_info = concerts_metadata.concerts.find((item) => {
    return params.slug === item.slug;
  });
  if (!concert_info) {
    throw error(404, "Page Not Found");
  } else {
    return {
      slug: params.slug,
    };
  }
}
