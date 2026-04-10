import Slider from "./Content/Slider";
import LoadingSlider from "./LoadingSlider/LoadingSlider";
import type { TraktResponse } from "../../../../utils/type/TraktType";

type propsType = {
  data: TraktResponse[];
  stateSlider: number;
  onChangeClickBtnSlider: (move: number) => any;
};

const ContentLoadingSlider = ({
  data,
  stateSlider,
  onChangeClickBtnSlider,
}: propsType) => {

  return (
    <>
      {data.length ? (
        <Slider
          data={data}
          stateSlider={stateSlider}
          onChangeClickBtnSlider={onChangeClickBtnSlider}
        />
      ) : (
        <LoadingSlider />
      )}
    </>
  );
};

export default ContentLoadingSlider;
