import "./PopularCategory.css";
import { useEffect, useState } from "react";
import type { OmdbResponse } from "../../../utils/type/OmdbType";
import type { TraktMovie } from "../../../utils/type/TraktMovieType";

const popularGenreArray = ["animation", "action", "comedy", "drama"];

const PopularCategory = () => {
  const [dataPopularTraktMovie, setDataPopularTraktMovie] = useState<
    TraktMovie[]
  >([]);
  const [dataPopularGenre, setDataPopularGenre] = useState<OmdbResponse[]>([]);

  useEffect(() => {
    const URL_POPULAR_GENRE_TraktMovie = `https://api.trakt.tv/movies/popular`;

    popularGenreArray.forEach((item) => {
      fetch(URL_POPULAR_GENRE_TraktMovie + `?genres=${item}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": "2",
          "trakt-api-key":
            "51c0cd2200c2a8a981a90cba506d3be1a337517a9e646786aefae6b8704890d4",
        },
      })
        .then((res) => res.json())
        .then((json: TraktMovie[]) =>
          setDataPopularTraktMovie((prev) => [...prev, json[5]])
        )
        .catch((err) => new Error(err));
    });
  }, []);
  useEffect(() => {
    if (dataPopularTraktMovie.length === 4) {
      const URL_POPULAR_GENRE = `https://www.omdbapi.com/?apikey=4c10715f`;

      dataPopularTraktMovie.forEach((item) => {
        fetch(URL_POPULAR_GENRE + `&i=${item.ids.imdb}`)
          .then((res) => res.json())
          .then((json: OmdbResponse) =>
            setDataPopularGenre((prev) => [...prev, json])
          )
          .catch((err) => new Error(err));
      });
    }
  }, [dataPopularTraktMovie]);
  return (
    <section className="section_popular_category">
      <div className="container_card_popular_category">
        {dataPopularGenre.map((item, index: number) => {
          return (
            <div key={index} className="card_popular_category">
              <div className="vintage"></div>
              <img src={item.Poster} alt="popular_category_img" />
              <h4 className="text_card">{popularGenreArray[index]}</h4>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PopularCategory;
