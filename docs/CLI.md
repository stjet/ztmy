# CLI Documentation

ztmy comes with some CLI commands!

## ztmy concerts <concert-slug>

Open up the page for a concert.

Eg: `ztmy concerts cleaning-labo` will open up the page for the Cleaning Labo concert.

There is also an optional parameter `--video` or `-v`, that allows you to specify a default video source. If it starts with `http`, it will be considered an URL. If not, it will look for it in your audio folder.

Eg: `ztmy concerts cleaning-labo -v cleaning-labo.mp4` will use `Music/cleaning-labo.mp4` on Windows.

## ztmy songs <song-slug>

Open up the page for a song.

Eg: `ztmy songs jk-bomber`
