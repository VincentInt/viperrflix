import "./PopularCategory.css";
import { useEffect, useState } from "react";
import type { TraktResponse } from "../../../utils/type/TraktType";

import { onLoadImg } from "../../../utils/onLoadImg/onLoadImg";
import LoadIndicator from "../../../UI/LoadIndicator/LoadIndicator";
import { Link } from "react-router-dom";

import dataMovies from "../../../utils/data/dataMovies";

const popularGenreArray = ["мультфильм", "триллер", "фэнтези", "драма"];

const PopularCategory = () => {
  const [dataPopularTraktMovie, setDataPopularTraktMovie] = useState<
    TraktResponse[]
  >([]);

  const [loadImgIndexs, setLoadImgIndexs] = useState<number[]>([]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (dataPopularTraktMovie.length === 4) {
        dataPopularTraktMovie.forEach((item: TraktResponse, index: number) => {
          onLoadImg(
            () => setLoadImgIndexs((prev: number[]) => [...prev, index]),
            `/viperrflix/img/movies/${item.images.poster}`,
          );
        });
      }
    }, 5000);
  }, [dataPopularTraktMovie]);
  return (
    <section className="section_popular_category">
      <div className="container_title">
        <h3 className="title_text">Популярные категории</h3>
      </div>
      <div className="container_card_popular_category">
        {popularGenreArray.length
          ? dataPopularTraktMovie.map((item, index: number) => {
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

                  <h4 className="text_card">{popularGenreArray[index]}</h4>
                </Link>
              );
            })
          : popularGenreArray.map((_, index: number) => {
              return (
                <div key={index} className="card_popular_category loading">
                  <LoadIndicator />
                </div>
              );
            })}
      </div>
    </section>
  );
};

export default PopularCategory;
