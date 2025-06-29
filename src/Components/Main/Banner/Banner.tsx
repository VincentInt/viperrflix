import "./Banner.css";
import { useEffect, useState } from "react";
import ContentBanner from "./ContentBanner/ContentLoaderContentBanner";
import { onLoadImg } from "../../../utils/onLoadImg";
import LoadIndicator from "../../../UI/LoadIndicator/LoadIndicator";
import LoadingSlider from "./Slider/LoadingSlider/LoadingSlider";
import ContentLoadingSlider from "./Slider/ContentLoaderSlider";

type SlideItemType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
type GenresItemType = {
  id: number;
  name: string;
};
const animationStyleElem = "animation_appearance ease-in-out forwards";
const animationReverseStyleElem =
  "animation_appearance_reverse  ease-in-out forwards";

const Banner = () => {
  const [allGenres, setAllGenres] = useState<GenresItemType[]>([]);
  const [dataBanner, setDataBanner] = useState<SlideItemType[]>([]);
  const [stateSlider, setStateSlider] = useState<number>(0);

  const [dataImgLoadingIndex, setDataImgLoadingIndex] = useState<number[]>([]);
  const [animationMove, setAnimationMove] = useState<false | number>(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=8fa2f286c8c7b7739bd2967da3ff4aa5&language=ru-RU`
    )
      .then((res) => res.json())
      .then((json) => setAllGenres(json.genres))
      .catch((err) => new Error(err));
  }, []);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=8fa2f286c8c7b7739bd2967da3ff4aa5&language=ru-RU&page=1"
    )
      .then((res) => res.json())
      .then((json) => {
        const filteredNullFields = json.result.filter((item: SlideItemType) => {
          for (const key in item) {
            const elem = item[key as keyof SlideItemType];
            if (elem === null || elem === "" || elem === undefined)
              return false;
          }
          return true;
        });
        setDataBanner(filteredNullFields);
      })
      .catch((err) => new Error(err));
  }, []);

  useEffect(() => {
    if (dataBanner.length !== 0) {
      for (const key in dataBanner) {
        onLoadImg(
          () => setDataImgLoadingIndex((prev) => [...prev, +key]),
          "https://image.tmdb.org/t/p/w1920" + dataBanner[key].backdrop_path
        );
      }
    }
  }, [dataBanner]);

  useEffect(() => {
    if (typeof animationMove === "number") {
      setTimeout(() => {
        setAnimationMove(false);
        onMoveSlider(animationMove);
      }, 800);
    }
  }, [animationMove]);

  function onChangeClickBtnSlider(move: number) {
    if (animationMove === false) {
      setAnimationMove(move);
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
        {dataImgLoadingIndex.includes(stateSlider) ? (
          <img
            className="page_img"
            src={
              "https://image.tmdb.org/t/p/w1920" +
              dataBanner[stateSlider]?.backdrop_path
            }
            alt="background_img"
          />
        ) : (
          <LoadIndicator />
        )}
      </div>
      <div className="container_content">
        <div className="content">
          <ContentBanner
            allGenres={allGenres}
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
