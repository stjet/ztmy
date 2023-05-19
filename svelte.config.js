//import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

import concerts_metadata from './src/lib/data/concerts/concerts_metadata.json' assert { type: "json" };
import songs_metadata from './src/lib/data/songs_metadata.json' assert { type: "json" };

let entries = ["*"];

//add /concerts to entries
for (let i=0; i < concerts_metadata.concerts.length; i++) {
	entries.push(`/concerts/${concerts_metadata.concerts[i].slug}`);
}

//add /songs
for (let i=0; i < Object.keys(songs_metadata).length; i++) {
	entries.push(`/songs/${Object.keys(songs_metadata)[i]}`);
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			entries
		}
	}
};

export default config;
