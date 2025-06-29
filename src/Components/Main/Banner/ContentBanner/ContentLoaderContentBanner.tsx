import LoadingContentBanner from "./LoadingContentBanner/LoadingContentBanner";
import ContentBanner from "./Content/ContentBanner";

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
type AnimationMoveType = false | number;
type GenresItemType = {
  id: number;
  name: string;
};
type propsType = {
  data: SlideItemType;
  animationMove: AnimationMoveType;
  allGenres: GenresItemType[];
};

const ContentLoaderBanner = ({ data, animationMove, allGenres }: propsType) => {
  return (
    <>
      {data ? (
        <ContentBanner
          data={data}
          animationMove={animationMove}
          allGenres={allGenres}
        />
      ) : (
        <LoadingContentBanner />
      )}
    </>
  );
};

export default ContentLoaderBanner;
