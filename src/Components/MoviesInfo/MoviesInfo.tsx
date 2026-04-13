import { useParams } from "react-router-dom";
import RatingIndicator from "../../UI/RatingIndicator/RatingIndicator";
import "./MoviesInfo.css";
import { useEffect, useState } from "react";
import type { TraktResponse } from "../../utils/type/TraktType";

import favoriteImg from "../../../public/img/icon/Vector (1).png";
import favoriteRedImg from "../../../public/img/icon/Vector red.png";

import dataMovies from "../../utils/data/dataMovies";

type CookieType = {
  loginStatus: boolean;
  userLogin: {
    name: string;
    login: string;
    password: string;
    email: string;
    date: string;
  };
  favorite: string[];
  countView: number;
  data: {
    userLogin: {
      name: string;
      login: string;
      password: string;
      email: string;
      date: string;
    };
    favorite: string[];
    countView: number;
  }[];
};

const ageRating = {
  G: "0+",
  PG: "6+",
  "PG-13": "13+",
  R: "17+",
  "NC-17": "18+",
};

const MoviesInfo = () => {
  const dataJson = [
    ...dataMovies.trending,
    ...dataMovies.popular,
    ...dataMovies.anticipated,
  ].filter(
    (item, index, self) =>
      index === self.findIndex((i) => i?.ids.trakt === item?.ids.trakt),
  ) as TraktResponse[];

  const [dataCardTrakt, setDataCardTrakt] = useState<TraktResponse>();
  const [cookies, setCookies] = useState<CookieType>();

  const params = useParams<{ id: string }>();
  const id = params.id;

  useEffect(() => {
    if (id?.length && id) {
      const cookie: CookieType = JSON.parse(
        document.cookie.split("userData=")[1],
      );
      cookie.countView += 1;
      document.cookie = `userData=${JSON.stringify(cookie)}; path=/`;
      setDataCardTrakt(dataJson.filter((item) => item?.ids?.trakt === +id)[0]);
    }
  }, [params]);
  useEffect(() => {
    if (document.cookie.length) {
      setCookies(JSON.parse(document.cookie.split("userData=")[1]));
    }
  }, []);

  function onFavorite() {
    if (cookies && dataCardTrakt) {
      const cookiesClone = JSON.parse(document.cookie.split("userData=")[1]);
      if (cookiesClone.favorite.includes(dataCardTrakt.ids.trakt.toString())) {
        cookiesClone.favorite = cookiesClone.favorite.filter(
          (itemFitler: any) =>
            itemFitler !== dataCardTrakt.ids.trakt.toString(),
        );
      } else {
        cookiesClone.favorite.push(dataCardTrakt.ids.trakt.toString());
      }
      document.cookie = `userData=${JSON.stringify(cookiesClone)}; path=/`;
      setCookies(cookiesClone);
    }
  }

  return (
    <section className="section_movies_info">
      {dataCardTrakt ? (
        <div className="main_container_info">
          <div className="container_img">
            <img
              className="img_poster"
              src={`/viperrflix/img/movies/${dataCardTrakt.images.poster}`}
              alt="card_img"
            />
            <div>
              {/* {dataCardTrakt.trailer ? (
                <>
                  <h6>Трейлер</h6>
                  <iframe
                    src={`https://www.youtube.com/embed/${dataCardTrakt.trailer.split("watch?v=")[1]}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </>
              ) : (
                ""
              )} */}
            </div>
          </div>
          <div className="container_info">
            <div className="container_flex_title">
              <div className="container_title">
                {dataCardTrakt?.images?.logo?.length ? (
                  <img
                    src={`/viperrflix/img/movies/${dataCardTrakt.images.logo}`}
                    alt=""
                  />
                ) : (
                  <h2 className="title">{dataCardTrakt.title}</h2>
                )}
              </div>
              <div className="container_title rating">
                <RatingIndicator
                  styles={{
                    fontSize: "clamp(16px, 2vw, 28px)",
                    paddingLeft: "clamp(5px, 2vw, 15px)",
                    paddingRight: "clamp(5px, 2vw, 15px)",
                    paddingTop: "clamp(2px, 1.2vw, 5px)",
                    paddingBottom: "clamp(2px, 1.2vw, 5px)",
                  }}
                  rating={dataCardTrakt.rating}
                />
                <h6 className="count">{Intl.NumberFormat().format(dataCardTrakt.votes)}</h6>
              </div>
            </div>
            <div className="container_btn">
              <button onClick={onFavorite}>
                <img
                  src={
                    cookies?.favorite.includes(
                      dataCardTrakt.ids.trakt.toString(),
                    )
                      ? favoriteRedImg
                      : favoriteImg
                  }
                  alt="favorite_btn_img"
                />
                <h5>Избранное</h5>
              </button>
              <button>
                <img
                  src="https://img.icons8.com/?size=100&id=VZobQTqqGoaP&format=png&color=000000"
                  alt="stream_btn_img"
                />
                <h5>Сайт фильма</h5>
              </button>
            </div>
            <div className="container_text_info">
              <h3>О фильме</h3>
              <h5>
                <span>Год производства:</span>
                {dataCardTrakt.released.split("-").reverse().join(".")}г
              </h5>
              <h5>
                <span>Страна:</span>
                {dataCardTrakt.country.toLocaleUpperCase()}
              </h5>
              <h5>
                <span>Возрасной рейтинг:</span>
                {ageRating[
                  dataCardTrakt.certification as keyof typeof ageRating
                ] ?? "—"}
              </h5>
              <h5>
                <span>Жанры:</span>
                {dataCardTrakt.genres.join(", ")}
              </h5>
              <h5>
                <span>Время фильма:</span>
                {Math.floor((+dataCardTrakt.runtime / 60) * 10) / 10}ч
              </h5>
              <div className="container_overview">
                <h3>Сюжет</h3>
                <p>{dataCardTrakt.overview}</p>
              </div>
            </div>
            <div className="container_gallery">
              <h3>Фанарт</h3>
              <div className="container_img">
                <img
                  src={`/viperrflix/img/movies/${dataCardTrakt.images.fanart}`}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="main_container_info_loading">
          <div className="img_poster">
            <div className="glow"></div>
          </div>
          <div className="container_info">
            <div className="title">
              <div className="glow"></div>
            </div>
            <div className="container_flex_info">
              <div className="main_info">
                <div className="glow"></div>
              </div>
            </div>
            <div className="container_text_info">
              <div>
                <div className="glow"></div>
              </div>
              <div>
                <div className="glow"></div>
              </div>
              <div>
                <div className="glow"></div>
              </div>
              <div>
                <div className="glow"></div>
              </div>
              <div>
                <div className="glow"></div>
              </div>
              <div>
                <div className="glow"></div>
              </div>
              <div>
                <div className="glow"></div>
              </div>
              <div>
                <div className="glow"></div>
              </div>
              <div>
                <div className="glow"></div>
              </div>
              <div>
                <div className="glow"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MoviesInfo;
