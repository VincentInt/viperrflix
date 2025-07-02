import "./Banner.css";
import LoadIndicator from "../../../UI/LoadIndicator/LoadIndicator";
import ContentLoadingSlider from "./Slider/ContentLoaderSlider";
import ContentLoaderBanner from "./ContentBanner/ContentLoaderContentBanner";
import { useEffect, useState } from "react";
import type { OmdbResponse } from "../../../utils/type/OmdbType";
import type { TraktResponse } from "../../../utils/type/TraktType";
import { fetchOmdb } from "../../../utils/fetch/fetchOmdb";
import { fetchTrakt } from "../../../utils/fetch/fetchTrakt";

const animationStyleElem = "animation_appearance ease-in-out forwards";
const animationReverseStyleElem =
  "animation_appearance_reverse  ease-in-out forwards";

const Banner = () => {
  const [dataPopularMovies, setDataPopularMovies] = useState<TraktResponse[]>([]);
  const [dataBanner, setDataBanner] = useState<OmdbResponse[]>([]);
  const [stateSlider, setStateSlider] = useState<number>(0);
  const [animationMove, setAnimationMove] = useState<false | number>(false);
  const [moveStatus, setMoveStatus] = useState<boolean>(true);

  useEffect(() => {
    fetchTrakt("movies/popular", (json: TraktResponse[]) => setDataPopularMovies(json));
  }, []);
  useEffect(() => {
    if (dataPopularMovies.length !== 0) {
      dataPopularMovies.forEach((item: TraktResponse) => {
        fetchOmdb(`&i=${item.ids.imdb}`, (json: OmdbResponse) =>
          setDataBanner((prev) => [...prev, json])
        );
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
