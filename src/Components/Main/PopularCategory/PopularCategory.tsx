import "./PopularCategory.css";
import { useEffect, useState } from "react";
import type { TraktResponse } from "../../../utils/type/TraktType";

import { onLoadImg } from "../../../utils/onLoadImg/onLoadImg";
import LoadIndicator from "../../../UI/LoadIndicator/LoadIndicator";
import { Link } from "react-router-dom";

import dataMovies from "../../../utils/data/dataMovies";
import LoadingPopularCategory from "./LoadingPopularCategory/LoadingPopularCategory";

const PopularCategory = () => {
  const [popularGenreArray, setPopularGenreArray] = useState<string[]>([]);
  const [dataPopularTraktMovie, setDataPopularTraktMovie] = useState<
    TraktResponse[]
  >([]);
  const [loadImgIndexs, setLoadImgIndexs] = useState<number[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setPopularGenreArray(["мультфильм", "триллер", "фэнтези", "драма"]);
    }, 1500);
  }, []);
  useEffect(() => {
    if (popularGenreArray.length) {
      popularGenreArray.forEach((item) => {
        setDataPopularTraktMovie((prev) => [
          ...prev,
          dataMovies.popular.filter((filterItem) => {
            if (filterItem?.genres?.includes(item)) {
              return true;
            } else false;
          })[0],
        ]);
      });
    }
  }, [popularGenreArray]);

  useEffect(() => {
    if (dataPopularTraktMovie.length === 4) {
      dataPopularTraktMovie.forEach((item: TraktResponse, index: number) => {
        onLoadImg(
          () => setLoadImgIndexs((prev: number[]) => [...prev, index]),
          `/viperrflix/img/movies/${item.images.poster}`,
        );
      });
    }
  }, [dataPopularTraktMovie]);
  return (
    <section className="section_popular_category">
      <div className="container_title">
        <h3 className="title_text">Популярные категории</h3>
      </div>
      <div className="container_card_popular_category">
        {popularGenreArray.length ? (
          dataPopularTraktMovie.map((item, index: number) => {
            return (
              <Link
                to={`genrecollection/${popularGenreArray[index]}`}
                key={index}
                className="card_popular_category"
              >
                <div className="vintage"></div>
                {loadImgIndexs.includes(index) ? (
                  <img
                    src={`/viperrflix/img/movies/${item.images.fanart}`}
                    alt="popular_category_img"
                  />
                ) : (
                  <LoadIndicator />
                )}

                <h4 className="text_card">
                  {loadImgIndexs.includes(index)
                    ? popularGenreArray[index]
                    : ""}
                </h4>
              </Link>
            );
          })
        ) : (
          <LoadingPopularCategory />
        )}
      </div>
    </section>
  );
};

export default PopularCategory;
