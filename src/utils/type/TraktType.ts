export type TraktResponse = {
  title: string;
  year: number;
  ids: {
    trakt: number;
    slug: string;
    imdb: string;
    tmdb: number;
  };
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
        name: string
      };
    }
  ];
};
export type TraktReadMoreResponse = {
  movie?: TraktResponse;
  show?: TraktResponse;
  watchers: number;
};
