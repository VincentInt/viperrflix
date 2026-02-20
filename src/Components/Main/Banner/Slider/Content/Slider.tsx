import "./Slider.css";
import leftArrowImg from "../../../../../../public/img/icon/Vector (3).png";
import rightArrowImg from "../../../../../../public/img/icon/Vector (4).png";
import LoadIndicator from "../../../../../UI/LoadIndicator/LoadIndicator";
import { useEffect, useRef, useState } from "react";
import { onLoadImg } from "../../../../../utils/onLoadImg/onLoadImg.ts";
import type { OmdbResponse } from "../../../../../utils/type/OmdbType.ts";

type propsType = {
  data: OmdbResponse[];
  stateSlider: number;
  onChangeClickBtnSlider: (move: number) => any;
};

const Slider = ({ data, stateSlider, onChangeClickBtnSlider }: propsType) => {
  const [dataImgLoadingIndex, setDataImgLoadingIndex] = useState<number[]>([]);
  const [sizeCard, setSizeCard] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const containerSliderRef = useRef<HTMLDivElement>(null);
  const cardSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(
      /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        navigator.userAgent,
      ),
    );
  }, []);
  useEffect(() => {
    const containerSliderCurrent = containerSliderRef.current;
    const cardSliderCurrent = cardSliderRef.current;

    if (containerSliderCurrent !== null && cardSliderCurrent !== null) {
      const gap = +containerSliderCurrent.style.gap.split("px")[0];
      const slidePage = Math.floor(
        (stateSlider - 1 > 0 ? stateSlider - 1 : 0) /
          Math.floor(
            containerSliderCurrent.clientWidth /
              (cardSliderCurrent.clientWidth + gap),
          ),
      );

      containerSliderCurrent.style.transform = `translateX(-${
        slidePage * containerSliderCurrent.clientWidth
      }px)`;
    }
  }, [stateSlider]);

  useEffect(() => {
    data.forEach((item, index) => {
      onLoadImg(
        () => setDataImgLoadingIndex((prev) => [...prev, index]),
        item.Poster,
      );
    });
  }, [data]);
  useEffect(() => {
    const containerSliderCurrent = containerSliderRef.current;
    const cardSliderCurrent = cardSliderRef.current;

    function calculateGap() {
      if (containerSliderCurrent !== null && cardSliderCurrent !== null) {
        const countCard = Math.floor(
          containerSliderCurrent.clientWidth /
            (cardSliderCurrent.clientWidth + 8),
        );
        const gap =
          (containerSliderCurrent.clientWidth -
            cardSliderCurrent.clientWidth * countCard) /
            countCard +
          1;
        containerSliderCurrent.style.gap = `${gap}px`;
        const width = containerSliderCurrent.clientWidth / 8 - 25 / 2 / 6;
        const height = width / 0.66;
        setSizeCard({
          width: width > 110 ? width : 110,
          height: height > 170 ? height : 170,
        });
      }
    }
    window.addEventListener("resize", calculateGap);
    calculateGap();
  }, [data]);

  const onClickCardSlider = (indexCard: number) => {
    if (stateSlider === indexCard) return;
    onChangeClickBtnSlider(indexCard - stateSlider);
  };

  return (
    <div
      style={
        isMobile && window.visualViewport?.height
          ? {
              marginBottom: `${window.screen.height - window.visualViewport?.height}px`,
            }
          : {marginBottom: `30px`}
      }
      className="container_banner_nav"
    >
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
          {data.map((item: OmdbResponse, index: number) => {
            if (containerSliderRef.current === null) return "";
            return (
              <div
                key={index}
                ref={cardSliderRef}
                onClick={() => onClickCardSlider(index)}
                className="container_img"
                style={{
                  minWidth: `${sizeCard.width}px`,
                  height: `${sizeCard.height}px`,
                }}
              >
                {dataImgLoadingIndex.includes(index) ? (
                  <img
                    className={index === stateSlider ? "chosen" : "not_chosen"}
                    style={{
                      minWidth: `${sizeCard.width}px`,
                      height:
                        index === stateSlider
                          ? `${sizeCard.height}px`
                          : `${sizeCard.height / 1.1}px`,
                    }}
                    src={item.Poster}
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
