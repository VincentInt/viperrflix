import "./ShortCard.css";
import favoriteImg from "../../../../public/img/icon/Vector (1).png";
import favoriteRedImg from "../../../../public/img/icon/Vector red.png";
import errorCardImg from "../../../../public/img/izobr.-otsutst-scaled.gif";
import LoadIndicator from "../../LoadIndicator/LoadIndicator";
import { onLoadImg } from "../../../utils/onLoadImg/onLoadImg";
import {
  forwardRef,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { TraktResponse } from "../../../utils/type/TraktType";
import RatingIndicator from "../../RatingIndicator/RatingIndicator";
import { Link } from "react-router-dom";

type Props = {
  item: TraktResponse;
  setCookiesProps?: Dispatch<SetStateAction<CookieType | undefined>>;
};
type StatusImg = "load" | "done" | "error";

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

const ShortCard = forwardRef<HTMLDivElement | null, Props>(
  ({ item, setCookiesProps }, ref) => {
    const [loadImg, setLoadImg] = useState<StatusImg>("load");
    const [cookies, setCookies] = useState<CookieType>();

    useEffect(() => {
      onLoadImg(
        (status) => setLoadImg(() => (status ? "done" : "error")),
        `/viperrflix/img/movies/${item.images.poster}`,
      );
    }, [item]);
    useEffect(() => {
      if (document.cookie.length) {
        setCookies(JSON.parse(document.cookie.split("userData=")[1]));
      }
    }, []);

    function onFavorite() {
      if (cookies) {
        const cookiesClone = JSON.parse(document.cookie.split("userData=")[1]);
        if (cookiesClone.favorite.includes(item.ids.trakt.toString())) {
          cookiesClone.favorite = cookiesClone.favorite.filter(
            (itemFitler: any) => itemFitler !== item.ids.trakt.toString(),
          );
        } else {
          cookiesClone.favorite.push(item.ids.trakt.toString());
        }
        document.cookie = `userData=${JSON.stringify(cookiesClone)}; path=/`;
        setCookies({ ...cookiesClone });
        if (setCookiesProps) {
          setCookiesProps({ ...cookiesClone });
        }
      }
    }

    return (
      <div ref={ref} className="card">
        <div className="container_img">
          {loadImg === "load" ? <LoadIndicator /> : ""}
          {loadImg === "done" ? (
            <img
              src={`/viperrflix/img/movies/${item.images.poster}`}
              alt="card_img"
            />
          ) : (
            ""
          )}
          {loadImg === "error" ? (
            <img className="error_card" src={errorCardImg} alt="error_card_img" />
          ) : (
            ""
          )}
        </div>
        <div className="container_text">
          <div className="container_flex_text name_rating">
            <h5 className="text_name">{item.title}</h5>
            <RatingIndicator rating={item.rating} />
          </div>
          <div className="container_flex_text container_genre">
            {item.genres.map((item, index) => {
              return (
                <h6 key={index} className="genre">
                  {item}
                </h6>
              );
            })}
          </div>
          <div className="container_flex_text ">
            <div>
              <h6>
                <span>Рейтинг: </span>
                {ageRating[item.certification as keyof typeof ageRating] ?? "—"}
              </h6>
              <h6>
                <span>Длительность: </span>
                {Math.floor((+item?.runtime / 60) * 10) / 10}ч
              </h6>
              <h6>
                <span>Вышел: </span>
                {item.released.split("-").reverse().join(".")}г
              </h6>
            </div>
          </div>
          <div className="container_info_nav">
            <Link to={`/info/${item.ids.trakt}`}>
              <h6>Подробнее</h6>
            </Link>
            <div className="container_btn">
              <a target="_" href={item.homepage}>
                <img
                  src="https://img.icons8.com/?size=100&id=VZobQTqqGoaP&format=png&color=000000"
                  alt="list_desired_img"
                />
              </a>
              <button onClick={onFavorite}>
                <img
                  src={
                    cookies?.favorite.includes(item.ids.trakt.toString())
                      ? favoriteRedImg
                      : favoriteImg
                  }
                  alt="favorite_img"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default ShortCard;
