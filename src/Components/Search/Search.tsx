import "./Search.css";
import { useParams } from "react-router-dom";
import CardList from "../../UI/CardList/CardList";
import { useEffect, useState, type RefObject } from "react";
import ShortCard from "../../UI/CardMovies/ShortCard/ShortCard";
import type { TraktResponse } from "../../utils/type/TraktType";

import dataMovies from "../../utils/data/dataMovies";

type ParamsType = {
  query: string;
};
type StatePage = {
  statusLoad: boolean;
  page: number;
};
const Search = () => {
  const params = useParams<ParamsType>();
  const query = params.query;

  const [statePage, setStatePage] = useState<StatePage>({
    statusLoad: false,
    page: 1,
  });
  const [dataJson, setDataJson] = useState<TraktResponse[]>([]);
  const [statusClear, setStatusClear] = useState<boolean>(false);

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
    setStatusClear(false);
    if (query?.length) {
      const data = [
        ...dataMovies.trending,
        ...dataMovies.popular,
        ...dataMovies.anticipated,
      ]
        .filter((filterItem, index, array) => {
          const firstIndex = array.findIndex(
            (item) => item?.ids?.trakt === filterItem?.ids?.trakt,
          );
          return firstIndex === index;
        })
        .filter((item) => {
          return item?.title
            ?.toLocaleLowerCase()
            .includes(query.toLocaleLowerCase());
        });
      if (data.length === 0) {
        setStatusClear(true);
      }
      setDataJson(data);
    }
    window.scrollTo(0, 0);
  }, [query]);
  return (
    <section className="section_search">
      <CardList
        title={`Поиск фильма: ${params.query}`}
        data={dataJson}
        paramsUrl={"trending"}
        statePage={statePage.page}
        statusMore={false}
        statusClear={statusClear}
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

export default Search;
