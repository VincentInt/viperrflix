import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import MainPage from "../Page/MainPage";

const Routers = () => {

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
