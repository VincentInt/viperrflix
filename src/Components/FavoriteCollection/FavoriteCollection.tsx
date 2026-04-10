import type { RefObject } from "react";
import CardList from "../../UI/CardList/CardList";


import dataTrending from "../../utils/data/tracktv/trending.json";
import type { TraktResponse } from "../../utils/type/TraktType";
import ShortCard from "../../UI/CardMovies/ShortCard/ShortCard";
import FavoriteCard from "../../UI/CardMovies/FavoriteCard/FavoriteCard";

const FavoriteCollection = () => {
  return  (
    <section className="section_collection">
      <FavoriteCard />
      {/* <CardList
        title={"Избранное"}
        data={(dataTrending.map((item) => item.movie) as TraktResponse[])}
        paramsUrl={"trending"}
        statusMore={false}
        renderCard={(
          item: TraktResponse,
          index: number,
          ref?: RefObject<HTMLDivElement | null>,
        ) => <ShortCard key={index} item={item} ref={ref} />}
      /> */}
    </section>
  );
};

export default FavoriteCollection;
