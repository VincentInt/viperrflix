import type { CSSProperties } from "react";
import "./RatingIndicator.css";

type Props = {
  rating: number;
  styles?: CSSProperties;
};

const RatingIndicator = ({ rating, styles }: Props) => {
  function colorRating(rating: number) {
    if (rating > 5) {
      let firstColor = 225 - (rating - 5) * 45;
      return `${firstColor}, ${225}`;
    } else {
      let lastColor = 225 + (rating - 5) * 45;
      return `${225}, ${lastColor}`;
    }
  }
  return (
    <div
      style={{
        backgroundColor: `rgb(${colorRating(rating)}, 0, 1)`,
      }}
      className="container_rating"
    >
      <div className="container_text_rating">
        <h6 style={{ ...styles }} className="text_rating">
          {rating.toFixed(1)}
        </h6>
      </div>
    </div>
  );
};

export default RatingIndicator;
