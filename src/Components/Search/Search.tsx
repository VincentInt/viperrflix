import "./Search.css";
import { useParams } from "react-router-dom";
import CardList from "../../UI/CardList/CardList";
import type { OmdbResponse } from "../../utils/type/OmdbType";
import { useEffect, useState, type RefObject } from "react";
import ShortCard from "../../UI/CardMovies/ShortCard/ShortCard";

type ParamsType = {
  query: string;
};
type StatePage = {
  statusLoad: boolean;
  page: number;
};
const Search = () => {
  const [statePage, setStatePage] = useState<StatePage>({
    statusLoad: false,
    page: 1,
  });
  const params = useParams<ParamsType>();

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
    <section className="section_search">
      <CardList
        title={`${params.query}`}
        paramsUrl={`search/movie?query=${params.query}&limit=20&page=${statePage.page}`}
        renderCard={(
          item: OmdbResponse,
          index: number,
          ref?: RefObject<HTMLDivElement | null>
        ) => <ShortCard key={index} item={item} ref={ref} />}
        setStatePage={setStatePage}
        statusMore={false}
      />
    </section>
  );
};

export default Search;
