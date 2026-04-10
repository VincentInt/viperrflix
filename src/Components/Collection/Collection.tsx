import "./Collection.css";
import { useParams } from "react-router-dom";
import CardList from "../../UI/CardList/CardList";
import { useEffect, useState, type RefObject } from "react";
import ShortCard from "../../UI/CardMovies/ShortCard/ShortCard";
import type { TraktResponse } from "../../utils/type/TraktType";

import dataMovies from "../../utils/data/dataMovies";

type Params = {
  sort: "trending" | "popular" | "anticipated";
};
type StatePage = {
  statusLoad: boolean;
  page: number;
};

const title = {
  trending: "Тренды",
  popular: "Популярное",
  anticipated: "Скоро выйдет",
};

const Collection = () => {
  const params = useParams<Params>();
  const sort = params.sort;

  const dataJson = dataMovies[sort !== undefined ? sort : "trending"];

  const [statePage, setStatePage] = useState<StatePage>({
    statusLoad: false,
    page: 1,
  });

  useEffect(() => {
    function cheackScroll() {
      const pageHeight = document.body.offsetHeight;
      const scrollPosition = window.scrollY + window.screen.height;
      if (scrollPosition > pageHeight - (pageHeight / 100) * 20) {
        setStatePage((prev) => {
          if (!prev.statusLoad)
            return { statusLoad: true, page: prev.page + 1 };
          else return prev;
        });
      }
    }
    window.addEventListener("scroll", cheackScroll);
    cheackScroll();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params]);
  return (
    <section className="section_collection">
      <CardList
        title={title[sort !== undefined ? sort : "trending"]}
        data={dataJson}
        paramsUrl={"trending"}
        statePage={statePage.page}
        statusMore={false}
        setStatePage={setStatePage}
        renderCard={(
          item: TraktResponse,
          index: number,
          ref?: RefObject<HTMLDivElement | null>,
        ) => <ShortCard key={index} item={item} ref={ref} />}
      />
    </section>
  );
};

export default Collection;
