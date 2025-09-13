import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import MainPage from "../Page/MainPage";
import MoviesCollectionPage from "../Page/MoviesCollectionPage";
import MoviesInfoPage from "../Page/MoviesInfoPage";

const Routers = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route
            path="collection/:type/:sort"
            element={<MoviesCollectionPage />}
          />
          <Route path="info/:type/:id" element={<MoviesInfoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
