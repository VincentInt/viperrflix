import type { OmdbResponse } from "../type/OmdbType";

const URL_OMDB = "https://www.omdbapi.com/";
const KEY_OMDB = "4c10715f";

export const fetchOmdb = (params: string, set: (json: OmdbResponse) => any) => {
  fetch(`${URL_OMDB}?apikey=${KEY_OMDB}${params}`)
    .then((res) => res.json())
    .then((json) => {
      set(json);
    })
    .catch((err) => new Error(err));
};
