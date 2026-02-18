import { Outlet } from "react-router-dom";
import Background from "./Background/Background";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout = () => {
  return (
    <>
      <Background />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
