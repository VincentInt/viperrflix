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
        title={"В тренде"}
        paramsUrl={"movies/trending"}
        renderCard={(
          item: OmdbResponse,
          index: number,
          ref?: RefObject<HTMLDivElement | null>
        ) => <ShortCard key={index} item={item} ref={ref} />}
      />
      <CardList
        title={"Ожидаемые новинки"}
        paramsUrl={"movies/anticipated"}
        renderCard={(
          item: OmdbResponse,
          index: number,
          ref?: RefObject<HTMLDivElement | null>
        ) => <ShortCard key={index} item={item} ref={ref} />}
      />
      <CardList
        title={"Популярные прокаты в США"}
        paramsUrl={"movies/boxoffice"}
        renderCard={(
          item: OmdbResponse,
          index: number,
          ref?: RefObject<HTMLDivElement | null>
        ) => <ShortCard key={index} item={item} ref={ref} />}
      />
      <CardList
        title={"Легендарные Фильмы"}
        paramsUrl={"movies/popular"}
        renderCard={(
          item: OmdbResponse,
          index: number,
          ref?: RefObject<HTMLDivElement | null>
        ) => <ShortCard key={index} item={item} ref={ref} />}
      />
    </>
  );
};

export default Main;
