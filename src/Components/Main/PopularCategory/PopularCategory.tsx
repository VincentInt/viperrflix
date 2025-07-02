import "./PopularCategory.css";
import { useEffect, useState } from "react";
import type { OmdbResponse } from "../../../utils/type/OmdbType";
import type { TraktResponse } from "../../../utils/type/TraktType";
import { fetchTrakt } from "../../../utils/fetch/fetchTrakt";
import { fetchOmdb } from "../../../utils/fetch/fetchOmdb";
import { onLoadImg } from "../../../utils/onLoadImg/onLoadImg";
import LoadIndicator from "../../../UI/LoadIndicator/LoadIndicator";

type TraktTrendingResponse = {
  movie: TraktResponse;
  watchers: number;
};

const popularGenreArray = ["animation", "action", "comedy", "drama"];

const PopularCategory = () => {
  const [dataPopularTraktMovie, setDataPopularTraktMovie] = useState<
    TraktResponse[]
  >([]);
  const [dataPopularGenre, setDataPopularGenre] = useState<OmdbResponse[]>([]);
  const [loadImgIndexs, setLoadImgIndexs] = useState<number[]>([]);
  useEffect(() => {
    popularGenreArray.forEach((item) => {
      fetchTrakt(
        `movies/trending?genres=${item}`,
        (json: TraktTrendingResponse[]) =>
          setDataPopularTraktMovie((prev) => [...prev, json[1].movie])
      );
    });
  }, []);
  useEffect(() => {
    if (dataPopularTraktMovie.length === 4) {
      dataPopularTraktMovie.forEach((item) => {
        fetchOmdb(`&i=${item.ids.imdb}`, (json: OmdbResponse) =>
          setDataPopularGenre((prev) => [...prev, json])
        );
      });
    }
  }, [dataPopularTraktMovie]);
  useEffect(() => {
    if (dataPopularGenre.length === 4) {
      dataPopularGenre.forEach((item, index) => {
        onLoadImg(
          () => setLoadImgIndexs((prev) => [...prev, index]),
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
            <div key={index} className="card_popular_category">
              <div className="vintage"></div>
              {loadImgIndexs.includes(index) ? (
                <img src={item.Poster} alt="popular_category_img" />
              ) : (
                <LoadIndicator />
              )}

              <h4 className="text_card">{popularGenreArray[index]}</h4>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PopularCategory;
