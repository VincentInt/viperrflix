import "./Slider.css";
import leftArrowImg from "../../../../../public/img/icon/Vector (3).png";
import rightArrowImg from "../../../../../public/img/icon/Vector (4).png";

import { useEffect, useRef, useState } from "react";
import LoadIndicator from "../../../../UI/LoadIndicator/LoadIndicator";

type SlideItemType = {
  id: number;
  backdrop_path: string;
};
type propsType = {
  data: SlideItemType[];
  stateSlider: number;
  onChangeClickBtnSlider: (move: number) => any;
};

const Slider = ({ data, stateSlider, onChangeClickBtnSlider }: propsType) => {
  const [dataImgIndex, setDataImgIndex] = useState<number[]>([]);
  const containerSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerSliderRef.current !== null) {
      const slidePage = Math.floor((stateSlider + 1) / 8);
      containerSliderRef.current.style.transform = ` translateX(-${
        slidePage * containerSliderRef.current.clientWidth + 30 * slidePage
      }px)`;
    }
  }, [stateSlider]);
  useEffect(() => {
    for (const key in data) {
      const img = new Image();
      img.onload = () => setDataImgIndex((prev) => [...prev, +key]);
      img.src = data[key].backdrop_path;
    }
  }, [data]);
  const onClickCardSlider = (indexCard: number) => {
    if (stateSlider === indexCard) return;
    if (stateSlider > indexCard)
      onChangeClickBtnSlider(stateSlider - indexCard);
    if (stateSlider < indexCard)
      onChangeClickBtnSlider(indexCard - stateSlider);
  };
  return (
    <div className="container_banner_nav">
      <div className="container_btn">
        <button onClick={() => onChangeClickBtnSlider(-1)}>
          <img src={leftArrowImg} alt="left_btn_arrow_img" />
        </button>
        <button onClick={() => onChangeClickBtnSlider(1)}>
          <img src={rightArrowImg} alt="right_btn_arrow_img" />
        </button>
      </div>
      <div className="container_window">
        <div ref={containerSliderRef} className="container_state_img_page">
          {data.map((item: SlideItemType, index: number) => {
            if (containerSliderRef.current === null) return "";
            const width =
              containerSliderRef.current.clientWidth / 8 - 25 / 2 / 6;
            const height = width / 0.66;

            return (
              <div
                key={index}
                onClick={() => onClickCardSlider(index)}
                className="container_img"
                style={{ minWidth: `${width}px`, minHeight: `${height}px` }}
              >
                {dataImgIndex.includes(index) ? (
                  <img
                    className={index === stateSlider ? "chosen" : "not_chosen"}
                    style={{
                      minWidth: `${width}px`,
                      height:
                        index === stateSlider
                          ? `${height}px`
                          : `${height / 1.1}px`,
                    }}
                    src={item.backdrop_path}
                    alt="state_img"
                  />
                ) : (
                  <LoadIndicator />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;
