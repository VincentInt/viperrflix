import LoadingContentBanner from "./LoadingContentBanner/LoadingContentBanner";
import ContentBanner from "./Content/ContentBanner";
import type {TraktResponse } from "../../../../utils/type/TraktType";

type AnimationMoveType = false | number;
type propsType = {
  data: TraktResponse;
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
