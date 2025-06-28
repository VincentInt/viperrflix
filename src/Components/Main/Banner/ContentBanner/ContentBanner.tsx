import "./ContentBanner.css";

import starImg from "../../../../../public/img/icon/Star 1.png";
import streamServiceImg from "../../../../../public/img/image 2.png";
import favoriteImg from "../../../../../public/img/icon/Vector (1).png";
import listImg from "../../../../../public/img/icon/Vector (2).png";

type SlideItemType = {
  id: number;
  img: string;
  backdrop_path: string;
  title: string;
  overview: string;
  vote_average: string;
  release_date: string;
  genres: string[];
  runtime: number | null;
};
type AnimationMoveType = false | number;

type propsType = {
  data: SlideItemType;
  animationMove: AnimationMoveType;
};

const animationStyleElem = "animation_appearance ease-in-out forwards";
const animationReverseStyleElem ="animation_appearance_reverse  ease-in-out forwards";

const ContentBanner = ({ data, animationMove }: propsType) => {
  return (
    <>
      {data ? (
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
              {data.title}
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
                <img src={starImg} alt="star_img" />
                <h3>{data.vote_average}</h3>
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
                <h3>{data.release_date}</h3>
              </div>
              {data.runtime !== null ? (
                <>
                  <div className="line"></div>
                  <div
                    className="container_item_info_page runtime"
                    style={
                      animationMove === false
                        ? {
                            animation: animationStyleElem + " 1.6s",
                          }
                        : {
                            animation: animationReverseStyleElem + " 0.8s",
                          }
                    }
                  >
                    <h3> {Math.ceil((data.runtime / 60) * 10) / 10}ч</h3>
                  </div>
                </>
              ) : (
                ""
              )}
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
                {data.genres.map((item: string, index: number) => {
                  return <h3 key={index}>{item}</h3>;
                })}
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
              {data.overview}
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
            <button>Подробнее</button>
            <button>
              Транслируеться на
              <img
                className="img_stream_service"
                src={streamServiceImg}
                alt="stream_service_img"
              />
            </button>
            <div className="container_small_btn">
              <button>
                <img src={favoriteImg} alt="favorite_img_btn" />
              </button>
              <button>
                <img src={listImg} alt="list_img_btn" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ContentBanner;
