import { useEffect, useState, type RefObject } from "react";
import CardList from "../../UI/CardList/CardList";
import type { TraktResponse } from "../../utils/type/TraktType";
import ShortCard from "../../UI/CardMovies/ShortCard/ShortCard";
import FavoriteCard from "../../UI/CardMovies/FavoriteCard/FavoriteCard";
import dataMovies from "../../utils/data/dataMovies";

type CookiesType = {
  loginStatus: boolean;
  userLogin: {
    name: string;
    login: string;
    password: string;
    email: string;
    date: string;
  };
  favorite: string[];
  countView: number;
  data: {
    userLogin: {
      name: string;
      login: string;
      password: string;
      email: string;
      date: string;
    };
    favorite: string[];
    countView: number;
  }[];
};

const FavoriteCollection = () => {
  const [cookies, setCookies] = useState<CookiesType>();

  const movies: TraktResponse[] = [
    ...dataMovies.anticipated,
    ...dataMovies.popular,
    ...dataMovies.trending,
  ];
  useEffect(() => {
    if (document.cookie.length) {
      setCookies(JSON.parse(document.cookie.split("userData=")[1]));
    }
  }, [document.cookie]);

  return (
    <section className="section_collection">
      <FavoriteCard />
      <CardList
        title={"Избранное"}
        statusClearFavorite={cookies?.favorite.length ? false : true}
        data={
          cookies?.favorite.length
            ? cookies?.favorite
                .map((item) => {
                  for (const key in movies) {
                    if (movies[key].ids.trakt.toString() === item) {
                      return movies[key];
                    }
                  }
                })
                .filter((item) => item !== undefined)
            : []
        }
        paramsUrl={"trending"}
        statusMore={false}
        renderCard={(
          item: TraktResponse,
          index: number,
          ref?: RefObject<HTMLDivElement | null>,
        ) => <ShortCard setCookiesProps={setCookies} key={index} item={item} ref={ref} />}
      />
    </section>
  );
};

export default FavoriteCollection;
