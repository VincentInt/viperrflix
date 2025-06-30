import LoadingContentBanner from "./LoadingContentBanner/LoadingContentBanner";
import ContentBanner from "./Content/ContentBanner";
import type { OmdbResponse } from "../Banner.tsx";

type AnimationMoveType = false | number;
type propsType = {
  data: OmdbResponse;
  animationMove: AnimationMoveType;
};
const ContentLoaderBanner = ({ data, animationMove }: propsType) => {
  return (
    <>
      {data ? (
        <ContentBanner data={data} animationMove={animationMove} />
      ) : (
        <LoadingContentBanner />
      )}
    </>
  );
};

export default ContentLoaderBanner;
