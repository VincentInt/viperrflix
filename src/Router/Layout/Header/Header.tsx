import "./Header.css";
import imgSearchIcon from "../../../../public/img/icon/Vector.png";

import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScrollHeader() {
      if (headerRef.current === null) return;
      if (window.scrollY >= headerRef.current.clientHeight * 10) {
        if (headerRef.current.style.position !== "fixed") {
          headerRef.current.style.transition = "";
          headerRef.current.style.transform = "translateY(-100%)";
          headerRef.current.style.position = "fixed";
          setTimeout(() => {
            if (headerRef.current === null) return;
            headerRef.current.style.transition = "all 0.3s ease";
            headerRef.current.style.transform = "translateY(0%)";
          }, 300);
        }
      } else if (headerRef.current.style.position === "fixed") {
        function resetStyle() {
          if (headerRef.current === null) return;
          headerRef.current.style.transition = "";
          headerRef.current.style.transform = "";
          headerRef.current.style.position = "absolute";
        }
        const animation = requestAnimationFrame(() => {
          if (headerRef.current === null) return;
          headerRef.current.style.transition = "all 0.3s ease";
          headerRef.current.style.transform = "translateY(-100%)";
        });
        if (window.scrollY <= headerRef.current.clientHeight * 2) {
          cancelAnimationFrame(animation);
          resetStyle();
        }
        setTimeout(() => {
          resetStyle();
        }, 300);
      }
    }
    window.addEventListener("scroll", onScrollHeader);
  }, []);
  return (
    <header ref={headerRef}>
      <div className="content_header">
        <h2>ViperFlix</h2>
        <nav className="container_header_nav">
          <Link to={""}>
            <h5>Главная</h5>
          </Link>
          <Link to={""}>
            <h5>Главная</h5>
          </Link>
          <Link to={""}>
            <h5>Главная</h5>
          </Link>
          <Link to={""}>
            <h5>Главная</h5>
          </Link>
          <Link to={""}>
            <h5>Главная</h5>
          </Link>
          <div className="container_input_search">
            <input type="text" placeholder="Поиск" />
            <img src={imgSearchIcon} alt="img_search_input" />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
