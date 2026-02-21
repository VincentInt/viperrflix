import { Link, useLocation } from "react-router-dom";
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
  statusMore?: boolean;
  renderCard: (
    item: OmdbResponse,
    index: number,
    ref?: RefObject<HTMLDivElement | null>,
  ) => ReactNode;
  setStatePage?: Dispatch<SetStateAction<StatePage>>;
};
const CardList = ({
  title,
  paramsUrl,
  statusMore = true,
  renderCard,
  setStatePage,
}: Props) => {
  const [dataCardsTrakt, setDataCardsTrakt] = useState<TraktResponse[]>([]);
  const [dataCardsOmdb, setDataCardsOmdb] = useState<OmdbResponse[]>([]);
  const [paramsTypeCard, setParamsTypeCard] = useState<string>("");

  const location = useLocation();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paramsUrl.split("/")[0] !== paramsTypeCard.split("/")[0]) {
      setDataCardsTrakt([]);
      setDataCardsOmdb([]);
    }
    setParamsTypeCard(paramsUrl);
  }, [paramsUrl]);

  useEffect(() => {
    if (paramsTypeCard.length !== 0) {
      if (!paramsTypeCard.includes("popular")) {
        fetchTrakt<TraktReadMoreResponse>(
          paramsTypeCard,
          (json: TraktReadMoreResponse[]) =>
            setDataCardsTrakt(() => {
              if (json.length === 0) return [];

              const firstItem = json[0];
              if (firstItem !== undefined) {
                if ("movie" in firstItem) {
                  return json.map((item) => item.movie) as TraktResponse[];
                } else if ("show" in firstItem) {
                  return json.map((item) => item.show) as TraktResponse[];
                }
                return [];
              } else {
                return [];
              }
            }),
        );
      } else {
        fetchTrakt<TraktResponse>(paramsTypeCard, (json: TraktResponse[]) =>
          setDataCardsTrakt(json),
        );
      }
    }
  }, [paramsTypeCard]);

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

  return (
    <section className="section_card_list">
      <div className="container_card_list">
        <div className="container_title">
          <h3 className="title_text">{title}</h3>
          {statusMore ? (
            <Link to={`collection/${paramsUrl}`} className="btn_show_more">
              <h5>Показать больше</h5>
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="container_cards">
          {dataCardsOmdb.length > 0
            ? dataCardsOmdb.map((item: OmdbResponse, index: number) => {
                const ref = index === 0 ? cardRef : undefined;
                return (
                  <Link
                    key={index}
                    to={`/info/${paramsTypeCard.split("/")[0]}/${
                      dataCardsTrakt[index]?.ids?.trakt
                    }`}
                  >
                    {renderCard(item, index, ref)}
                  </Link>
                );
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
