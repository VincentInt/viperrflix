import "./Banner.css";

import Slider from "./Slider/Slider";
import { useEffect, useState } from "react";
import ContentBanner from "./ContentBanner/ContentBanner";

type SlideItemType = {
  id: number;
  img: string;
  backdrop_path: string;
  title: string;
  overview: string;
  vote_average: string;
  release_date: string;
  genres: string[];
  runtime: number | null;
};

const animationStyleElem = "animation_appearance ease-in-out forwards";
const animationReverseStyleElem =
  "animation_appearance_reverse  ease-in-out forwards";

const Banner = () => {
  const [dataBanner, setDataBanner] = useState<SlideItemType[]>([]);
  const [stateSlider, setStateSlider] = useState<number>(0);

  const [animationMove, setAnimationMove] = useState<false | number>(false);

  useEffect(() => {
    setDataBanner([
      {
        id: 912649,
        img: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg",
        backdrop_path:
          "https://image.tmdb.org/t/p/w300_and_h450_bestv2/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
        title: "Веном: Последний танец",
        overview:
          "Эдди Брок и Веном вынуждены скрываться. Преследуемые сразу двумя мирами, они вынуждены принять судьбоносное решение, которое положит конец их историям.",
        vote_average: "6.8",
        release_date: "22.10.2024",
        genres: ["Боевик", "Фантастика"],
        runtime: 109, // 1 ч 49 мин :contentReference[oaicite:1]{index=1}
      },
      {
        id: 1241982,
        img: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/m0SbwFNCa9epW1X60deLqTHiP7x.jpg",
        backdrop_path:
          "https://image.tmdb.org/t/p/w300_and_h450_bestv2/m0SbwFNCa9epW1X60deLqTHiP7x.jpg",
        title: "Моана 2",
        overview:
          "Моана получает неожиданное послание от своих предков и отправляется вместе с Мауи и новой командой в опасное путешествие по неизведанным водам.",
        vote_average: "7.0",
        release_date: "21.11.2024",
        genres: ["Мультфильм", "Приключения", "Семейный"],
        runtime: null, // нужно запросить через API
      },
      {
        id: 762509,
        img: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/oHPoF0Gzu8xwK4CtdXDaWdcuZxZ.jpg",
        backdrop_path:
          "https://image.tmdb.org/t/p/w300_and_h450_bestv2/oHPoF0Gzu8xwK4CtdXDaWdcuZxZ.jpg",
        title: "Муфаса: Король Лев",
        overview:
          "История Муфасы, сироты, нашедшего друга по имени Така, и их путешествие, полное испытаний, судьбы и опасностей.",
        vote_average: "7.3",
        release_date: "05.07.2024",
        genres: ["Мультфильм", "Драма", "Приключения"],
        runtime: null,
      },
      {
        id: 970450,
        img: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/fzjH7kt1017R9EckLDmWmH5pGhD.jpg",
        backdrop_path:
          "https://image.tmdb.org/t/p/w300_and_h450_bestv2/fzjH7kt1017R9EckLDmWmH5pGhD.jpg",
        title: "Оборотни",
        overview:
          "Год спустя после катастрофического полнолуния снова поднимается угроза. Учёные пытаются остановить мутацию, но всё выходит из‑под контроля.",
        vote_average: "6.1",
        release_date: "04.12.2024",
        genres: ["Ужасы", "Фантастика", "Триллер"],
        runtime: null,
      },
      {
        id: 823219,
        img: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/b3mdmjYTEL70j7nuXATUAD9qgu4.jpg",
        backdrop_path:
          "https://image.tmdb.org/t/p/w300_and_h450_bestv2/imKSymKBK7o73sajciEmndJoVkR.jpg",
        title: "Страуме",
        overview:
          "Кот, выживший после великого наводнения, оказывается на лодке с другими животными. Вместе они ищут способ адаптироваться к новому миру.",
        vote_average: "6.0",
        release_date: "10.09.2024",
        genres: ["Драма", "Приключения", "Семейный"],
        runtime: null,
      },
      {
        id: 766507,
        img: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/8riWcADI1ekEiBguVB9vkilhiQm.jpg",
        backdrop_path:
          "https://image.tmdb.org/t/p/w300_and_h450_bestv2/8riWcADI1ekEiBguVB9vkilhiQm.jpg",
        title: "Человек‑паук: За пределами вселенной",
        overview:
          "Майлз Моралес отправляется в новое приключение по мультивселенной, сталкиваясь с неизвестными угрозами и новым пауко‑героем.",
        vote_average: "8.5",
        release_date: "29.03.2024",
        genres: ["Анимация", "Приключения", "Экшн"],
        runtime: null,
      },
      {
        id: 620285,
        img: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
        backdrop_path:
          "https://image.tmdb.org/t/p/w300_and_h450_bestv2/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
        title: "Дюна: Часть вторая",
        overview:
          "Пол Атрейдес объединяется с Чани и фременами, чтобы отомстить за семью и изменить судьбу галактики.",
        vote_average: "8.3",
        release_date: "01.03.2024",
        genres: ["Приключения", "Драма", "Фантастика"],
        runtime: 166, // 2 ч 46 мин :contentReference[oaicite:2]{index=2}
      },
      {
        id: 823464,
        img: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg",
        backdrop_path:
          "https://image.tmdb.org/t/p/w300_and_h450_bestv2/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg",
        title: "Годзилла и Конг: Новая империя",
        overview:
          "Новые сражения титанов, угрожающие разрушить человечество. Годзилла и Конг снова вступают в бой.",
        vote_average: "7.1",
        release_date: "27.03.2024",
        genres: ["Боевик", "Фантастика"],
        runtime: 115, // 1 ч 55 мин :contentReference[oaicite:3]{index=3}
      },
    ]);
  }, []);
  useEffect(() => {
    if (typeof animationMove === "number") {
      setTimeout(() => {
        setAnimationMove(false);
        onMoveSlider(animationMove);
      }, 800);
    }
  }, [animationMove]);
  function onChangeClickBtnSlider(move: number) {
    if (animationMove === false) {
      setAnimationMove(move);
    }
  }
  function onMoveSlider(move: number) {
    const indexMove = stateSlider + move;
    const dataBannerLength = dataBanner.length - 1;

    if (indexMove > dataBannerLength) {
      setStateSlider(0);
    } else if (indexMove < 0) {
      setStateSlider(dataBannerLength);
    } else {
      setStateSlider(indexMove);
    }
  }
  return (
    <section className="container_banner">
      <div
        style={
          animationMove === false
            ? { animation: animationStyleElem + " 1s" }
            : { animation: animationReverseStyleElem + " 1s" }
        }
        className="container_img_page"
      >
        <div className="vignette"></div>
        <img
          className="page_img"
          src={dataBanner[stateSlider]?.img}
          alt="background_img"
        />
      </div>
      <div className="container_content">
        <div className="content">
          <ContentBanner
            animationMove={animationMove}
            data={dataBanner[stateSlider]}
          />
          <Slider
            data={dataBanner}
            stateSlider={stateSlider}
            onChangeClickBtnSlider={onChangeClickBtnSlider}
          />
        </div>
      </div>
      <div className="container_blur_transition"></div>
    </section>
  );
};

export default Banner;
