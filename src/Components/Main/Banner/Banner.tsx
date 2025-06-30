import "./Banner.css";
import LoadIndicator from "../../../UI/LoadIndicator/LoadIndicator";
import ContentLoadingSlider from "./Slider/ContentLoaderSlider";
import ContentLoaderBanner from "./ContentBanner/ContentLoaderContentBanner";
import { useEffect, useState } from "react";
import type { OmdbResponse } from "../../../utils/type/OmdbType";
import type { TraktMovie } from "../../../utils/type/TraktMovieType";

const animationStyleElem = "animation_appearance ease-in-out forwards";
const animationReverseStyleElem =
  "animation_appearance_reverse  ease-in-out forwards";

const Banner = () => {
  const [dataPopularMovies, setDataPopularMovies] = useState<TraktMovie[]>([]);
  const [dataBanner, setDataBanner] = useState<OmdbResponse[]>([]);
  const [stateSlider, setStateSlider] = useState<number>(0);
  const [animationMove, setAnimationMove] = useState<false | number>(false);
  const [moveStatus, setMoveStatus] = useState<boolean>(true);

  useEffect(() => {
    const URL_POPULAR_MOVIE = "https://api.trakt.tv/movies/popular";

    fetch(URL_POPULAR_MOVIE, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key":
          "51c0cd2200c2a8a981a90cba506d3be1a337517a9e646786aefae6b8704890d4",
      },
    })
      .then((res) => res.json())
      .then((json) => setDataPopularMovies(json))
      .catch((err) => new Error(err));
  }, []);
  useEffect(() => {
    if (dataPopularMovies.length !== 0) {
      const URL_BANNER_MOVIES = "https://www.omdbapi.com/?apikey=4c10715f";

      dataPopularMovies.forEach((item: TraktMovie) => {
        fetch(URL_BANNER_MOVIES + `&i=${item.ids.imdb}`)
          .then((res) => res.json())
          .then((json) => setDataBanner((prev) => [...prev, json]))
          .catch((err) => new Error(err));
      });
    }
  }, [dataPopularMovies]);

  useEffect(() => {
    if (typeof animationMove === "number") {
      setTimeout(() => {
        setAnimationMove(false);
        onMoveSlider(animationMove);
      }, 800);
      setTimeout(() => {
        setMoveStatus(true);
      }, 2200);
    }
  }, [animationMove]);

  function onChangeClickBtnSlider(move: number) {
    if (animationMove === false && moveStatus) {
      setAnimationMove(move);
      setMoveStatus(false);
    }
  }
  function onMoveSlider(move: number) {
    const indexMove = stateSlider + move;
    const dataBannerLength = dataBanner.length - 1;

    if (indexMove > dataBannerLength) {
      setStateSlider(0);
    } else if (indexMove < 0) {
      setStateSlider(dataBannerLength);
    } else {
      setStateSlider(indexMove);
    }
  }
  return (
    <section className="container_banner">
      <div
        style={
          animationMove === false
            ? { animation: animationStyleElem + " 1s" }
            : { animation: animationReverseStyleElem + " 1s" }
        }
        className="container_img_page"
      >
        <div className="vignette"></div>
        {dataBanner.length ? (
          <img
            className="page_img"
            src={dataBanner[stateSlider]?.Poster}
            alt="background_img"
          />
        ) : (
          <LoadIndicator />
        )}
      </div>
      <div className="container_content">
        <div className="content">
          <ContentLoaderBanner
            animationMove={animationMove}
            data={dataBanner[stateSlider]}
          />
          <ContentLoadingSlider
            data={dataBanner}
            stateSlider={stateSlider}
            onChangeClickBtnSlider={onChangeClickBtnSlider}
          />
        </div>
      </div>
      <div className="container_blur_transition"></div>
    </section>
  );
};

export default Banner;
