export type ConcertMetadata = {
  title: string,
  slug: string,
  subtitle: string,
  thumbnail_url: string
};

export type SetItem = {
  jap: string,
  eng: string,
  youtube: string | boolean,
  song: boolean,
  timestamp: string[2]
}

export type ConcertInfo = {
  title: string,
  slug: string,
  subtitle: string,
  thumbnail_url: string,
  description: string,
  images: string[],
  dates: string[],
  setlist: SetItem[]
};
