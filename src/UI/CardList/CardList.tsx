import "./CardList.css";
import React, { useEffect, useRef } from "react";

const CardList = ({ children }: any) => {
  const containerCardsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (children.type.name !== "ShortCard") return;
    const containerCardsCurrent = containerCardsRef.current;
    const cardCurrent = cardRef.current;

    let countCard: number = 5;
    let timer: number;

    function calculateGap() {
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
  }, [containerCardsRef, cardRef]);

  return (
    <section className="section_card_list">
      <div className="container_card_list">
        <h3 className="title_text">Популярное</h3>
        <div ref={containerCardsRef} className="container_cards">
          {[...Array(7)].map((_: unknown, index: number) => {
            return React.cloneElement(children, { key: index, ref: cardRef });
          })}
        </div>
      </div>
    </section>
  );
};

export default CardList;
