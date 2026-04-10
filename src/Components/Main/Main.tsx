import Banner from "./Banner/Banner";
import CardList from "../../UI/CardList/CardList";
import PopularCategory from "./PopularCategory/PopularCategory";
import ShortCard from "../../UI/CardMovies/ShortCard/ShortCard";

import { type RefObject } from "react";
import type { TraktResponse } from "../../utils/type/TraktType";
import dataMovies from "../../utils/data/dataMovies";

const Main = () => {
  return (
    <>
  
      <Banner />
      <PopularCategory />
      <CardList
        title={"Популярное"}
        data={dataMovies.popular}
        paramsUrl={"popular"}
        renderCard={(
          item: TraktResponse,
          index: number,
          ref?: RefObject<HTMLDivElement | null>,
        ) => <ShortCard key={index} item={item} ref={ref} />}
      />
      <CardList
        title={"Тренды"}
        data={dataMovies.trending}
        paramsUrl={"trending"}
        renderCard={(
          item: TraktResponse,
          index: number,
          ref?: RefObject<HTMLDivElement | null>,
        ) => <ShortCard key={index} item={item} ref={ref} />}
      />
      <CardList
        title={"Скоро выйдет"}
        data={dataMovies.anticipated}
        paramsUrl={"anticipated"}
        renderCard={(
          item: TraktResponse,
          index: number,
          ref?: RefObject<HTMLDivElement | null>,
        ) => <ShortCard key={index} item={item} ref={ref} />}
      />
    </>
  );
};

export default Main;
