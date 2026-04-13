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


  useEffect(() => {
    setTimeout(() => {
      setDataPopularMovies(dataMovies.trending.slice(0, 10));
    }, 1500);
  }, []);
  useEffect(() => {
    if (typeof animationMove === "number") {
      setTimeout(() => {
        setAnimationMove(false);
        onMoveSlider(animationMove);
      }, 800);
    }
  }, [animationMove]);

  function onChangeClickBtnSlider(move: number) {
    setAnimationMove(move);

  }
  function onMoveSlider(move: number) {
    setStateSlider(move);
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
