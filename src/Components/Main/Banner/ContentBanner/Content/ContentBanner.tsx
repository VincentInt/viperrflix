import "./ContentBanner.css";
import favoriteImg from "../../../../../../public/img/icon/Vector (1).png";
import favoriteRedImg from "../../../../../../public/img/icon/Vector red.png";
import type { TraktResponse } from "../../../../../utils/type/TraktType";
import { Link } from "react-router-dom";
import RatingIndicator from "../../../../../UI/RatingIndicator/RatingIndicator";
import { useEffect, useState } from "react";

type AnimationMoveType = false | number;
type propsType = {
  data: TraktResponse;
  animationMove: AnimationMoveType;
};
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

const animationStyleElem = "animation_appearance ease-in-out forwards";
const animationReverseStyleElem =
  "animation_appearance_reverse  ease-in-out forwards";

const ContentBanner = ({ data, animationMove }: propsType) => {
  const [cookies, setCookies] = useState<CookieType>();
  useEffect(() => {
    if (document.cookie.length) {
      setCookies(JSON.parse(document.cookie.split("userData=")[1]));
    }
  }, []);
  function onFavorite() {
    if (cookies) {
      const cookiesClone = JSON.parse(document.cookie.split("userData=")[1]);
      if (cookiesClone.favorite.includes(data.ids.trakt.toString())) {
        cookiesClone.favorite = cookiesClone.favorite.filter(
          (itemFitler: any) => itemFitler !== data.ids.trakt.toString(),
        );
      } else {
        cookiesClone.favorite.push(data.ids.trakt.toString());
      }
      document.cookie = `userData=${JSON.stringify(cookiesClone)}; path=/`;
      setCookies(cookiesClone);
    }
  }
  return (
    <div className="container_info_page">
      <div>
        <h1
          style={
            animationMove === false
              ? {
                  animation: animationStyleElem + " 0.8s",
                }
              : {
                  animation: animationReverseStyleElem + " 0.8s",
                }
          }
        >
          {data?.title}
        </h1>
        <div
          className="container_info"
          style={
            animationMove === false
              ? {
                  animation: animationStyleElem + " 1s",
                }
              : {
                  animation: animationReverseStyleElem + " 0.8s",
                }
          }
        >
          <div
            className="container_item_info_page rating"
            style={
              animationMove === false
                ? {
                    animation: animationStyleElem + " 1.2s",
                  }
                : {
                    animation: animationReverseStyleElem + " 0.8s",
                  }
            }
          >
            <RatingIndicator
              rating={data?.rating}
              styles={{
                fontSize: "clamp(16px, 2vw, 26px)",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            />
          </div>
          <div className="line"></div>
          <div
            className="container_item_info_page release_date"
            style={
              animationMove === false
                ? {
                    animation: animationStyleElem + " 1.4s",
                  }
                : {
                    animation: animationReverseStyleElem + " 0.8s",
                  }
            }
          >
            <h3>{data?.released.split("-").reverse().join(".")}</h3>
          </div>
          <div className="line"></div>
          <div
            className="container_item_info_page genres"
            style={
              animationMove === false
                ? {
                    animation: animationStyleElem + " 1.8s",
                  }
                : {
                    animation: animationReverseStyleElem + " 0.8s",
                  }
            }
          >
            <h3>
              {data?.genres.map((item, index) => {
                if (index === data.genres.length - 1) {
                  return item + ".";
                } else {
                  return item + ", ";
                }
              })}
            </h3>
          </div>
        </div>
        <p
          className="p_text_description"
          style={
            animationMove === false
              ? {
                  animation: animationStyleElem + " 2s",
                }
              : {
                  animation: animationReverseStyleElem + " 0.8s",
                }
          }
        >
          {data?.overview}
        </p>
      </div>
      <div
        className="container_btn info_source_btn"
        style={
          animationMove === false
            ? {
                animation: animationStyleElem + " 2.2s",
              }
            : {
                animation: animationReverseStyleElem + " 0.8s",
              }
        }
      >
        <Link to={`info/${data?.ids.trakt}`}>
          <h5>Подробнее</h5>
        </Link>
        {data?.homepage ? (
          <a target="_" href={data.homepage}>
            <h5>Сайт фильма</h5>
          </a>
        ) : (
          ""
        )}

        <div className="container_small_btn">
          <button onClick={onFavorite}>
            <img
              src={
                cookies?.favorite.includes(data.ids.trakt.toString())
                  ? favoriteRedImg
                  : favoriteImg
              }
              alt="favorite_img_btn"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentBanner;
