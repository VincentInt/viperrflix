import { Outlet } from "react-router-dom";
import Background from "./Background/Background";
import Header from "./Header/Header";

const Layout = () => {
  return (
    <>
      <Background />
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
