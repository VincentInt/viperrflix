import type { RefObject } from "react";
import CardList from "../../UI/CardList/CardList";
import type { TraktResponse } from "../../utils/type/TraktType";
import ShortCard from "../../UI/CardMovies/ShortCard/ShortCard";

const NotFound = () => {
  return (
    <section className="section_collection">
      <CardList
        title={""}
        paramsUrl=""
        statusNotFound={true}
        data={[]}
        statusMore={false}
        renderCard={(
          item: TraktResponse,
          index: number,
          ref?: RefObject<HTMLDivElement | null>,
        ) => <ShortCard key={index} item={item} ref={ref} />}
      />
    </section>
  );
};

export default NotFound;
