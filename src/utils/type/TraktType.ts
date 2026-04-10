export type TraktResponse = {
  title: string;
  year: number;
  ids: {
    trakt: number;
    slug: string;
    imdb: string;
    tmdb: number;
    plex: {
      guid?: string;
      slug?: string;
    };
  };
  tagline: string;
  overview: string;
  runtime: number;
  country: string;
  trailer?: string;
  homepage?: string;
  status: string;
  rating: number;
  votes: number;
  comment_count: number;
  updated_at: string;
  language: string;
  languages: string[];
  available_translations: string[];
  genres: string[];
  subgenres: string[];
  original_title: string;
  images: {
    fanart?: string[];
    poster?: string[];
    logo?: string[];
    banner: string[];
    thumb?: string[];
    clearart?: string[];
  };
  colors: {
    poster: string[];
  };
  released: string;
  after_credits: boolean;
  during_credits: boolean;
  certification?: string;
};

export type TraktPeopleResponse = {
  cast: [
    {
      character: string;
      characters: Array<string>;
      person: {
        ids: {
          imdb: string;
          slug: string;
          tmdb: number;
          trakt: number;
        };
        name: string;
      };
    },
  ];
};
export type TraktReadMoreResponse = {
  movie?: TraktResponse;
  show?: TraktResponse;
  watchers: number;
};
