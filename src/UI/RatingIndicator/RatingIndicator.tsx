import type { OmdbResponse } from "../../utils/type/OmdbType";
import "./RatingIndicator.css";

type Props = {
  item: OmdbResponse;
};

const RatingIndicator = ({ item }: Props) => {
  function colorRating(rating: string) {
    if (+rating > 5) {
      let firstColor = 225 - (+rating - 5) * 45;
      return `${firstColor}, ${225}`;
    } else {
      let lastColor = 225 + (+rating - 5) * 45;
      return `${225}, ${lastColor}`;
    }
  }
  return (
    <div
      style={{
        backgroundColor: `rgb(${colorRating(item.imdbRating)}, 0, 0.6)`,
      }}
      className="container_rating"
    >
      <h6 className="text_rating">{item.imdbRating}</h6>
    </div>
  );
};

export default RatingIndicator;
