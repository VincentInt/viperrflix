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
export type TraktReadMoreResponse = {
  movie: TraktResponse;
  watchers: number;
};