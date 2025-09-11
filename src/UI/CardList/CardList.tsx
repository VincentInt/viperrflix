import { Link, useLocation} from "react-router-dom";
import { fetchOmdb } from "../../utils/fetch/fetchOmdb";
import { fetchTrakt } from "../../utils/fetch/fetchTrakt";
import type { OmdbResponse } from "../../utils/type/OmdbType";
import type {
  TraktReadMoreResponse,
  TraktResponse,
} from "../../utils/type/TraktType";
import LoadingShortCard from "../CardMovies/LoadingShortCard/LoadingShortCard";
import "./CardList.css";
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from "react";

type StatePage = {
  statusLoad: boolean;
  page: number;
};
type Props = {
  title: string;
  paramsUrl: string;
  renderCard: (
    item: OmdbResponse,
    index: number,
    ref?: RefObject<HTMLDivElement | null>
  ) => ReactNode;
  setStatePage?: Dispatch<SetStateAction<StatePage>>;
};
const CardList = ({ title, paramsUrl, renderCard, setStatePage }: Props) => {
  const [dataCardsTrakt, setDataCardsTrakt] = useState<TraktResponse[]>([]);
  const [dataCardsOmdb, setDataCardsOmdb] = useState<OmdbResponse[]>([]);

  const location = useLocation();

  const containerCardsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!paramsUrl.includes("popular")) {
      fetchTrakt<TraktReadMoreResponse>(
        paramsUrl,
        (json: TraktReadMoreResponse[]) =>
          setDataCardsTrakt(json.map((item) => item.movie))
      );
    } else {
      fetchTrakt<TraktResponse>(paramsUrl, (json: TraktResponse[]) =>
        setDataCardsTrakt(json)
      );
    }
  }, [paramsUrl]);
  useEffect(() => {
    if (dataCardsTrakt.length !== 0) {
      dataCardsTrakt.forEach((item: TraktResponse) => {
        fetchOmdb<OmdbResponse>(`&i=${item.ids.imdb}`, (json: OmdbResponse) => {
          if (
            location.pathname.includes("collection") &&
            setStatePage !== undefined
          ) {
            setStatePage((prev: StatePage) => ({
              ...prev,
              statusLoad: false,
            }));
          }
          setDataCardsOmdb((prev) => [...prev, json]);
        });
      });
    }
  }, [dataCardsTrakt]);

  useEffect(() => {
    let countCard: number = 5;
    let timer: number;

    function calculateGap() {
      const containerCardsCurrent = containerCardsRef.current;
      const cardCurrent = cardRef.current;
      if (containerCardsCurrent !== null && cardCurrent !== null) {
        const gap =
          (containerCardsCurrent.clientWidth -
            cardCurrent.clientWidth * countCard) /
          (countCard - 1);
        if (
          gap >=
          cardCurrent.clientWidth / countCard + gap / (countCard - 1)
        ) {
          countCard += 1;
          timer = setTimeout(() => {
            calculateGap();
          }, 0);
        } else if (gap < 20) {
          countCard -= 1;
          timer = setTimeout(() => {
            calculateGap();
          }, 0);
        } else {
          containerCardsCurrent.style.gap = `${gap - 1.5 * 2}px`;
        }
      }
    }
    window.addEventListener("resize", () => {
      calculateGap(), clearTimeout(timer);
    });
    calculateGap();
  }, [dataCardsOmdb, containerCardsRef, cardRef]);
  return (
    <section className="section_card_list">
      <div className="container_card_list">
        <div className="container_title">
          <h3 className="title_text">{title}</h3>
          {!location.pathname.includes("collection") ? (
            <Link to={`collection/${paramsUrl}`} className="btn_show_more">
              <h5> Показать больше</h5>
            </Link>
          ) : (
            ""
          )}
        </div>
        <div ref={containerCardsRef} className="container_cards">
          {dataCardsOmdb.length > 0
            ? dataCardsOmdb.map((item: OmdbResponse, index: number) => {
                const ref = index === 0 ? cardRef : undefined;
                return renderCard(item, index, ref);
              })
            : [...Array(10)].map((_, index) => {
                const ref = index === 0 ? cardRef : undefined;
                return <LoadingShortCard key={index} ref={ref} />;
              })}
        </div>
      </div>
    </section>
  );
};

export default CardList;
