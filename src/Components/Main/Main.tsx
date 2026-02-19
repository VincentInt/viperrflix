import Banner from "./Banner/Banner";
import CardList from "../../UI/CardList/CardList";
import PopularCategory from "./PopularCategory/PopularCategory";
import ShortCard from "../../UI/CardMovies/ShortCard/ShortCard";
import type { RefObject } from "react";
import type { OmdbResponse } from "../../utils/type/OmdbType";

const Main = () => {
  return (
    <>
      <Banner />
      <PopularCategory />
      <CardList
        title={"trending"}
        paramsUrl={"movies/trending"}
        renderCard={(
          item: OmdbResponse,
          index: number,
          ref?: RefObject<HTMLDivElement | null>,
        ) => <ShortCard key={index} item={item} ref={ref} />}
      />
      <CardList
        title={"popular"}
        paramsUrl={"movies/popular"}
        renderCard={(
          item: OmdbResponse,
          index: number,
          ref?: RefObject<HTMLDivElement | null>,
        ) => <ShortCard key={index} item={item} ref={ref} />}
      />
      <CardList
        title={"anticipated"}
        paramsUrl={"movies/anticipated"}
        renderCard={(
          item: OmdbResponse,
          index: number,
          ref?: RefObject<HTMLDivElement | null>,
        ) => <ShortCard key={index} item={item} ref={ref} />}
      />
      <CardList
        title={"boxoffice"}
        paramsUrl={"movies/boxoffice"}
        renderCard={(
          item: OmdbResponse,
          index: number,
          ref?: RefObject<HTMLDivElement | null>,
        ) => <ShortCard key={index} item={item} ref={ref} />}
      />
    </>
  );
};

export default Main;
