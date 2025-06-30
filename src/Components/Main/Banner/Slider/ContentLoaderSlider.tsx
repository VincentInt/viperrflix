import Slider from "./Content/Slider";
import LoadingSlider from "./LoadingSlider/LoadingSlider";
import type { OmdbResponse } from "../../../../utils/type/OmdbType";

type propsType = {
  data: OmdbResponse[];
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
