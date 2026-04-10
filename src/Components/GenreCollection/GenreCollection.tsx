import "./GenreCollection.css";
import { useParams } from "react-router-dom";
import CardList from "../../UI/CardList/CardList";
import { useEffect, useState, type RefObject } from "react";
import ShortCard from "../../UI/CardMovies/ShortCard/ShortCard";
import type { TraktResponse } from "../../utils/type/TraktType";

import dataMovies from "../../utils/data/dataMovies";

type Title = "Боевик" | "Триллер" | "Фэнтези" | "Драма";
type Params = {
  genre: Title;
};
type StatePage = {
  statusLoad: boolean;
  page: number;
};

const GenreCollection = () => {
  const params = useParams<Params>();
  const genre = `${params.genre}`;

  const [dataJson, setDataJson] = useState<TraktResponse[]>([]);
  const [statePage, setStatePage] = useState<StatePage>({
    statusLoad: false,
    page: 1,
  });
  useEffect(() => {
    setDataJson(
      [...dataMovies.trending, ...dataMovies.popular, ...dataMovies.anticipated]
        .filter((filterItem, index, array) => {
          for (const key in array) {
            if (
              filterItem?.ids?.trakt === array[key]?.ids?.trakt &&
              index !== +key
            ) {
              return false;
            } else return true;
          }
          return true;
        })
        .filter((item) => {
          return item?.genres?.includes(genre);
        }),
    );
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
  }, [params]);
  return (
    <section className="section_collection">
      <CardList
        title={genre}
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

export default GenreCollection;
