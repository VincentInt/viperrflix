import { fetchOmdb } from "../../utils/fetch/fetchOmdb";
import { fetchTrakt } from "../../utils/fetch/fetchTrakt";
import type { OmdbResponse } from "../../utils/type/OmdbType";
import type { TraktResponse } from "../../utils/type/TraktType";
import "./CardList.css";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

type TraktTrendingResponse = {
  movie: TraktResponse;
  watchers: number;
};
type Props = {
  title: string;
  paramsUrl: string;
  renderCard: (
    item: OmdbResponse,
    index: number,
    ref?: RefObject<HTMLDivElement | null>
  ) => ReactNode;
};
const CardList = ({ title, paramsUrl, renderCard }: Props) => {
  const [dataCardsTrakt, setDataCardsTrakt] = useState<TraktTrendingResponse[]>(
    []
  );
  const [dataCardsOmdb, setDataCardsOmdb] = useState<OmdbResponse[]>([]);

  const containerCardsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTrakt(paramsUrl, (json: TraktTrendingResponse[]) =>
      setDataCardsTrakt(json)
    );
  }, []);
  useEffect(() => {
    if (dataCardsTrakt.length !== 0) {
      dataCardsTrakt.forEach((item: TraktTrendingResponse) => {
        fetchOmdb(`&i=${item.movie.ids.imdb}`, (json: OmdbResponse) =>
          setDataCardsOmdb((prev) => [...prev, json])
        );
      });
    }
  }, [dataCardsTrakt]);

  useEffect(() => {
    // if (children.type.name !== "ShortCard") return;

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
        <h3 className="title_text">{title}</h3>
        <div ref={containerCardsRef} className="container_cards">
          {dataCardsOmdb.map((item: OmdbResponse, index: number) => {
            const ref = index === 0 ? cardRef : undefined;
            return renderCard(item, index, ref);
          })}
        </div>
      </div>
    </section>
  );
};

export default CardList;
