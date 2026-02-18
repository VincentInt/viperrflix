const URL_TVMAZE = "https://api.tvmaze.com/";
const API_KEY = "FaXrCDwWquscgrOw8dTUoM2gtgOg0GtI";

export const fetchTvmaze = <T>(params: string, set: (json: T[]) => any) => {
  fetch(
    params.length
      ? `${URL_TVMAZE}${params}&apikey=${API_KEY}`
      : `${URL_TVMAZE}?apikey=${API_KEY}`,
    {
      mode: "no-cors",
    }
  )
    .then((res) => res.json())
    .then((json) => {
      set(json);
    })
    .catch((err) => new Error(err));
};
