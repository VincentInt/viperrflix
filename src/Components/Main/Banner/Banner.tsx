import "./Banner.css";
import ContentLoadingSlider from "./Slider/ContentLoaderSlider";
import ContentLoaderBanner from "./ContentBanner/ContentLoaderContentBanner";
import { useEffect, useState } from "react";
import type { TraktResponse } from "../../../utils/type/TraktType";

import dataMovies from "../../../utils/data/dataMovies";

const animationStyleElem = "animation_appearance ease-in-out forwards";
const animationReverseStyleElem =
  "animation_appearance_reverse  ease-in-out forwards";

const Banner = () => {
  const [dataPopularMovies, setDataPopularMovies] = useState<TraktResponse[]>(
    [],
  );
  const [stateSlider, setStateSlider] = useState<number>(0);
  const [animationMove, setAnimationMove] = useState<false | number>(false);
  const [moveStatus, setMoveStatus] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setDataPopularMovies(dataMovies.trending.slice(0, 10));
    }, 5000);
  }, []);
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
    const dataBannerLength = dataPopularMovies.length - 1;

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
        {dataPopularMovies.length ? (
          <img
            className="page_img"
            src={`/viperrflix/img/movies/${dataPopularMovies[stateSlider]?.images.fanart}`}
            alt="background_img"
          />
        ) : (
          ""
        )}
      </div>
      <div className="container_content">
        <div className="content">
          <ContentLoaderBanner
            animationMove={animationMove}
            data={dataPopularMovies[stateSlider]}
          />
          <ContentLoadingSlider
            data={dataPopularMovies}
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
