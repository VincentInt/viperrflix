import { Link } from "react-router-dom";
import type { TraktResponse } from "../../utils/type/TraktType";
import LoadingShortCard from "../CardMovies/LoadingShortCard/LoadingShortCard";
import cryImg from "../../../public/img/crying-sad.gif";
import favoriteImg from "../../../public/img/victoria.gif";
import notFoundImg from "../../../public/img/anime-girl.gif"

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
  data: TraktResponse[];
  paramsUrl: string;
  statusMore?: boolean;
  statusNotFound?: boolean;
  statusClear?: boolean;
  statusClearFavorite?: boolean;
  renderCard: (
    item: TraktResponse,
    index: number,
    ref?: RefObject<HTMLDivElement | null>,
  ) => ReactNode;
  setStatePage?: Dispatch<SetStateAction<StatePage>>;
  statePage?: number;
};
const CardList = ({
  title,
  data,
  paramsUrl,
  statusMore = true,
  renderCard,
  statusClear = false,
  statusClearFavorite = false,
  setStatePage,
  statePage,
  statusNotFound = false,
}: Props) => {
  const [dataCardsTrakt, setDataCardsTrakt] = useState<TraktResponse[]>([]);
  const [stateLoadPage, setStateLoadPage] = useState<number>(1);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setDataCardsTrakt([...data]);
    }, 1500);
  }, [data]);

  useEffect(() => {
    if (statePage !== undefined && setStatePage !== undefined) {
      setStateLoadPage(statePage);
      setStatePage((prev) => ({ ...prev, statusLoad: false }));
    }
  }, [statePage]);

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

        {statusNotFound ? (
          <div className="container_clear">
            <h2>Страница не найдена</h2>
            <img src={notFoundImg} alt="cry_img" />
          </div>
        ) : statusClear ? (
          <div className="container_clear">
            <h2>Нечего подходящего не нашлось</h2>
            <img src={cryImg} alt="cry_img" />
          </div>
        ) : statusClearFavorite ? (
          <div className="container_clear favorite">
            <h2>Вы нечего не добавили в избранное</h2>
            <img src={favoriteImg} alt="" />
          </div>
        ) : (
          <div className="container_cards">
            {dataCardsTrakt.length > 0
              ? dataCardsTrakt
                  .slice(0, stateLoadPage * 20)
                  .map((item: TraktResponse, index: number) => {
                    const ref = index === 0 ? cardRef : undefined;

                    return (
                      <div key={index}>{renderCard(item, index, ref)}</div>
                    );
                  })
              : [...Array(20)].map((_, index) => {
                  const ref = index === 0 ? cardRef : undefined;
                  return <LoadingShortCard key={index} ref={ref} />;
                })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CardList;
