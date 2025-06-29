import Slider from "./Content/Slider";
import LoadingSlider from "./LoadingSlider/LoadingSlider";

type SlideItemType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
type propsType = {
  data: SlideItemType[];
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
