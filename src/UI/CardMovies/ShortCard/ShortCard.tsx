import "./ShortCard.css";
import favoriteImg from "../../../../public/img/icon/Vector (1).png";
import listDesiredImg from "../../../../public/img/icon/Vector (2).png";
import errorCardImg from "../../../../public/img/izobr.-otsutst-scaled.jpg";
import LoadIndicator from "../../LoadIndicator/LoadIndicator";
import { onLoadImg } from "../../../utils/onLoadImg/onLoadImg";
import { forwardRef, useEffect, useState } from "react";
import type { OmdbResponse } from "../../../utils/type/OmdbType";
import RatingIndicator from "../../RatingIndicator/RatingIndicator";

type Props = {
  item: OmdbResponse;
};
type StatusImg = "load" | "done" | "error";

const ShortCard = forwardRef<HTMLDivElement | null, Props>(({ item }, ref) => {
  const [loadImg, setLoadImg] = useState<StatusImg>("load");

  useEffect(() => {
    onLoadImg(
      (status) => setLoadImg(() => (status ? "done" : "error")),
      item.Poster
    );
  }, [item]);

  return (
    <div ref={ref} className="card">
      <div className="container_img">
        {loadImg === "load" ? <LoadIndicator /> : ""}
        {loadImg === "done" ? <img src={item.Poster} alt="card_img" /> : ""}
        {loadImg === "error" ? (
          <img src={errorCardImg} alt="error_card_img" />
        ) : (
          ""
        )}
      </div>
      <div className="container_text">
        <div className="container_flex_text name_rating">
          <h5 className="text_name">{item.Title}</h5>
          <RatingIndicator item={item} />
        </div>
        <div className="container_flex_text container_genre">
          {item?.Genre?.split(",").map((item, index) => {
            return (
              <h6 key={index} className="genre">
                {item}
              </h6>
            );
          })}
        </div>
        <div className="container_flex_text container_info_nav">
          <div>
            <h6>Age: {item.Rated}</h6>
            <h6>
              Time line:{" "}
              {Math.floor((+item?.Runtime?.split(" ")[0] / 60) * 10) / 10}H
            </h6>
            <h6>Date: {item.Released}</h6>
          </div>
          <div className="container_btn">
            <button>
              <img src={favoriteImg} alt="favorite_img" />
            </button>
            <button>
              <img src={listDesiredImg} alt="list_desired_img" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ShortCard;
