import "./PopularCategory.css";
import { useEffect, useState } from "react";
import type { OmdbResponse } from "../../../utils/type/OmdbType";
import type {
  TraktResponse,
  TraktReadMoreResponse,
} from "../../../utils/type/TraktType";
import { fetchTrakt } from "../../../utils/fetch/fetchTrakt";
import { fetchOmdb } from "../../../utils/fetch/fetchOmdb";
import { onLoadImg } from "../../../utils/onLoadImg/onLoadImg";
import LoadIndicator from "../../../UI/LoadIndicator/LoadIndicator";
import { Link } from "react-router-dom";

const popularGenreArray = ["animation", "action", "comedy", "drama"];

const PopularCategory = () => {
  const [dataPopularTraktMovie, setDataPopularTraktMovie] = useState<
    TraktResponse[]
  >([]);
  const [dataPopularGenre, setDataPopularGenre] = useState<OmdbResponse[]>([]);
  const [loadImgIndexs, setLoadImgIndexs] = useState<number[]>([]);

  useEffect(() => {
    popularGenreArray.forEach((item) => {
      fetchTrakt<TraktReadMoreResponse>(
        `movies/trending?genres=${item}`,
        (json: TraktReadMoreResponse[]) =>
          setDataPopularTraktMovie((prev: TraktResponse[]) => {
            if (!json || json.length === 0) return prev;
            const movieItem = json.find(
              (item: TraktReadMoreResponse) => item.movie
            );
            if (movieItem && movieItem.movie) {
              return [...prev, movieItem.movie];
            }
            return prev;
          })
      );
    });
  }, []);
  useEffect(() => {
    if (dataPopularTraktMovie.length === 4) {
      dataPopularTraktMovie.forEach((item: TraktResponse) => {
        fetchOmdb<OmdbResponse>(`&i=${item.ids.imdb}`, (json: OmdbResponse) =>
          setDataPopularGenre((prev: OmdbResponse[]) => [...prev, json])
        );
      });
    }
  }, [dataPopularTraktMovie]);
  useEffect(() => {
    if (dataPopularGenre.length === 4) {
      dataPopularGenre.forEach((item: OmdbResponse, index: number) => {
        onLoadImg(
          () => setLoadImgIndexs((prev: number[]) => [...prev, index]),
          item.Poster
        );
      });
    }
  }, [dataPopularGenre]);
  return (
    <section className="section_popular_category">
      <div className="container_card_popular_category">
        {dataPopularGenre.map((item, index: number) => {
          return (
            <Link
              to={`collection/movies/popular?genres=${popularGenreArray[index]}&limit=20`}
              key={index}
              className="card_popular_category"
            >
              <div className="vintage"></div>
              {loadImgIndexs.includes(index) ? (
                <img src={item.Poster} alt="popular_category_img" />
              ) : (
                <LoadIndicator />
              )}

              <h4 className="text_card">{popularGenreArray[index]}</h4>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default PopularCategory;
