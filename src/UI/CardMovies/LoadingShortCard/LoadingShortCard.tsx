import { forwardRef } from "react";
import LoadIndicator from "../../LoadIndicator/LoadIndicator";
import "./LoadingShortCard.css";

const LoadingShortCard = forwardRef<HTMLDivElement>((key, ref) => {
  return (
    <div ref={ref} className="short_card_loading">
      <div className="container_img">
        <LoadIndicator />
      </div>
      <div className="container_text">
        <div className="container_flex_text name_rating">
          <div className="text_loading title">
            <div className="glow"></div>
          </div>
          <div className="container_rating">
            <div className="text_loading rating">
              <div className="glow"></div>
            </div>
          </div>
        </div>
        <div className="container_flex_text container_genre">
          {[...Array(4)].map((_, index) => {
            return (
              <div key={index} className="text_loading genre">
                <div className="glow"></div>
              </div>
            );
          })}
        </div>
        <div className="container_flex_text container_info_nav">
          <div className="container_text_info">
            <div className="text_loading">
              <div className="glow"></div>
            </div>
            <div className="text_loading">
              <div className="glow"></div>
            </div>
            <div className="text_loading">
              <div className="glow"></div>
            </div>
          </div>
          <div className="container_btn">
            <div className="btn_loading">
              <div className="glow"></div>
            </div>
            <div className="btn_loading">
              <div className="glow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LoadingShortCard;
