const URL_OMDB = "https://www.omdbapi.com/";
const KEY_OMDB = "4c10715f";

export const fetchOmdb = <T>(params: string, set: (json: T) => any) => {
  fetch(`${URL_OMDB}?apikey=${KEY_OMDB}${params}`)
    .then((res) => res.json())
    .then((json) => {
      set(json);
    })
    .catch((err) => new Error(err));
};
