import "./CompilationCollection.css";
import CardList from "../../UI/CardList/CardList";
import { useEffect, useState, type RefObject } from "react";
import ShortCard from "../../UI/CardMovies/ShortCard/ShortCard";
import type { TraktResponse } from "../../utils/type/TraktType";

import dataMovies from "../../utils/data/dataMovies";

type StatePage = {
  statusLoad: boolean;
  page: number;
};

const CompilationCollection = () => {
  const [dataJson, setDataJson] = useState<TraktResponse[]>([]);
  const [statePage, setStatePage] = useState<StatePage>({
    statusLoad: false,
    page: 1,
  });
  useEffect(() => {
    const array = [
      ...dataMovies.trending,
      ...dataMovies.popular,
      ...dataMovies.anticipated,
    ].filter((filterItem, index, array) => {
      const firstIndex = array.findIndex(
        (item) => item?.ids?.trakt === filterItem?.ids?.trakt,
      );
      return firstIndex === index;
    });

    setDataJson(() => {
      const cloneArray = [...array];

      return array.map(() => {
        const randomIndex = Math.trunc(Math.random() * cloneArray.length);
        return cloneArray.splice(randomIndex, 1)[0];
      });
    });
  }, []);

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
  }, []);
  return (
    <section className="section_collection">
      <CardList
        title={"Подборка"}
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

export default CompilationCollection;
