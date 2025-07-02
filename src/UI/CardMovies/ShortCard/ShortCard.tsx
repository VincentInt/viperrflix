import { forwardRef, useEffect, useState, type RefObject } from "react";
import type { OmdbResponse } from "../../../utils/type/OmdbType";
import "./ShortCard.css";
import { onLoadImg } from "../../../utils/onLoadImg/onLoadImg";
import LoadIndicator from "../../LoadIndicator/LoadIndicator";

type Props = {
  item: OmdbResponse;
};
function colorRating(rating: string) {
  if (+rating > 5) {
    let firstColor = 225 - (+rating - 5) * 45;
    return `${firstColor}, ${225}`;
  } else {
    let lastColor = 225 + (+rating - 5) * 45;
    return `${225}, ${lastColor}`;
  }
}
const ShortCard = forwardRef<HTMLDivElement | null, Props>(({ item }, ref) => {
  const [loadImg, setLoadImg] = useState<boolean>(false);
  useEffect(() => {
    onLoadImg(() => setLoadImg(true), item.Poster);
  }, [item]);
  return (
    <div ref={ref} className="card">
      <div className="container_img">
        {loadImg ? <img src={item.Poster} alt="card_img" /> : <LoadIndicator />}
      </div>
      <div className="container_text">
        <div className="container_flex_text name_rating">
          <h5 className="text_name">{item.Title}</h5>
          <div
            style={{
              backgroundColor: `rgb(${colorRating(item.imdbRating)}, 0, 0.6)`,
            }}
            className="container_rating"
          >
            <h6 className="text_rating">{item.imdbRating}</h6>
          </div>
        </div>
        <div className="container_flex_text container_genre">
          {item?.Genre.split(",").map((item, index) => {
            return (
              <h6 key={index} className="genre">
                {item}
              </h6>
            );
          })}
        </div>
        <h6>Age: {item.Rated}</h6>
        <h6>
          RunTime: {Math.floor((+item.Runtime.split(" ")[0] / 60) * 10) / 10}h
        </h6>
        <div className="container_flex_text">
          <h6>{item.Released}</h6>
        </div>
      </div>
    </div>
  );
});

export default ShortCard;
