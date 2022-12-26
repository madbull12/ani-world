export interface Anime {
  mal_id: number;
  images: JPG;
  trailer: Trailer;
  title: string;
  title_english: string;
  title_japanese: string;
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  season: string;
  year: number;
  synopsis: string;
  background: string;
}

export interface IMain {
  seasonsNow: Anime[];
  seasonYear: Anime[];
  seasonsUpcoming: Anime[];
  // animeNews:Anime[];
}

export interface Genre {
  mal_id: 0;
  type: string;
  name: string;
}

export interface AnimeDetailsProps extends Anime {
  genres: Genre[];
  studios: Genre[];
  broadcast: {
    day: string;
    time: string;
    timezone: string;
    string: string;
  };
}

export interface Recommendation {
  entry: Entry;
  votes: number;
}

export interface Entry extends Anime {
  images: JPG;
  mal_id: number;
  title: string;
}

export interface Stats {
  watching: number;
  completed: number;
  on_hold: number;
  dropped: number;
  plan_to_watch: number;
  total: number;
  scores: Score[];
  reading: number;

  plan_to_read: number;
}


export interface Character {
  character: SingleCharacter;
  role: string;
  voice_actors: VoiceActor[];
}

export interface Staff {
  person: SingleCharacter;
  positions: string[];
}

interface SingleCharacter {
  mal_id: number;
  url: string;
  images: JPG;
  name: string;
}

export interface VoiceActor {
  person: SingleCharacter;
  language: string;
}

interface Score {
  votes: number;
  score: number;
  percentage: number;
}

interface Studio {}

interface Aired {
  from: string;
  to: string;
  prop: {
    from: {
      day: number;
      month: number;
      year: number;
    };
    to: {
      day: number;
      month: number;
      year: number;
    };
  };
}

interface Trailer {
  youtube_id: string;
  url: string;
  embed_url: string;
}

interface JPG {
  jpg: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
}

export interface IRow {
  items: Anime[];
  title: string;
}

export interface Review {
  date: string;
  episodes_watched: number;
  mal_id: number;
  review: string;
  score: number;
  reactions: {
    confusing: number;
    creative: number;
    funny: number;
    informative: number;
    love_it: number;
    nice: number;
    overall: number;
    well_written: number;
  };
  type: string;
  user: {
    images: JPG;
    username: string;
  };
  votes: number;
}

export interface IPromo {
  title: string;
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: {
      image_url: string;
      small_image_url: string;
      medium_image_url: string;
      large_image_url: string;
      maximum_image_url: string;
    };
  };
}
export interface IMusicVideo {
  title: string;
  meta: {
    title: string;
    author: string;
  };
  video: {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: {
      image_url: string;
      small_image_url: string;
      medium_image_url: string;
      large_image_url: string;
      maximum_image_url: string;
    };
  };
}

export interface ISavedResp {
  id: string;
  title: string;
  imageUrl: string;
  malId: number;
}

export interface IGenre {
  name: string;
  count: number;
  mal_id: number;
}

export interface Manga {
  mal_id: number;
  url: string;
  images: { [key: string]: Image };
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  type: string;
  chapters: number;
  volumes: number;
  status: string;
  publishing: boolean;
  published: Published;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  authors: Author[];
  serializations: Author[];
  genres: Author[];
  explicit_genres: Author[];
  themes: Author[];
  demographics: Author[];
}

export interface Author {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Image {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface Published {
  from: string;
  to: string;
  prop: Prop;
}

export interface Prop {
  from: From;
  to: From;
  string: string;
}

export interface From {
  day: number;
  month: number;
  year: number;
}

export interface Title {
  type: string;
  title: string;
}
