import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import MainPage from "../Page/MainPage";
import MoviesCollectionPage from "../Page/MoviesCollectionPage";
import MoviesInfoPage from "../Page/MoviesInfoPage";
import SearchPage from "../Page/SearchPage";
import MoviesGenreCollectionPage from "../Page/MoviesGenreCollentionPage";
import MoviesCompilationCollectionPage from "../Page/MoviesCompilationCollectionPage";
import FavoritePage from "../Page/FavoritePage";
import LoginPage from "../Page/LoginPage";
import RegistrPage from "../Page/RegistrPage";
import { useEffect } from "react";
import ProfilePage from "../Page/ProfilePage";

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

const Routers = () => {
  useEffect(() => {
    if (document.cookie.length === 0) {
      const cookie: CookiesType = {
        loginStatus: false,
        userLogin: { name: "", login: "", password: "", email: "", date: "" },
        favorite: [],
        countView: 0,
        data: [],
      };
      document.cookie = `userData=${JSON.stringify(cookie)}; path=/`;
    }
  }, []);
  return (
    //Сделать адаптив профиле
    //сделать медленную загрузку для всех страниц
    //популярные категории сделать мешьне задержку
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="collection/:sort" element={<MoviesCollectionPage />} />
          <Route
            path="genrecollection/:genre"
            element={<MoviesGenreCollectionPage />}
          />
          <Route path="search/:query" element={<SearchPage />} />
          <Route path="info/:id" element={<MoviesInfoPage />} />
          <Route
            path="compilation/"
            element={<MoviesCompilationCollectionPage />}
          />
          <Route path="favorite/" element={<FavoritePage />} />
          <Route path="login/" element={<LoginPage />} />
          <Route path="registr/" element={<RegistrPage />} />
          <Route path="profile/" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
