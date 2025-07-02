import type { Trakt } from "../type/TraktType";

const URL_TRAKT = "https://api.trakt.tv/";
const OPTIONS_TRAKT = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "trakt-api-version": "2",
    "trakt-api-key":
      "51c0cd2200c2a8a981a90cba506d3be1a337517a9e646786aefae6b8704890d4",
  },
};

export const fetchTrakt = (params: string, set: (json: Trakt[]) => any) => {
  fetch(`${URL_TRAKT}${params}`, OPTIONS_TRAKT)
    .then((res) => res.json())
    .then((json) => {
      set(json);
    })
    .catch((err) => new Error(err));
};
