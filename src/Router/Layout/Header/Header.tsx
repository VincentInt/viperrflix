import "./Header.css";
import imgSearchIcon from "../../../../public/img/icon/Vector.png";
import imgBurgerMenuIcon from "../../../../public/img/icon/icons8-гамбургер-меню-50.png";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

const Header = () => {
  const [statusBurger, setStatusBurger] = useState<boolean | null>(null);
  const [inputSearch, setInputSearch] = useState<string>("");
  const headerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  window.addEventListener("resize", () => {
    if (window.innerWidth > 580) {
      setStatusBurger(null);
    }
  });
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
  function onChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setInputSearch(event.target.value);
  }
  function onSendInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter") {
      navigate(`search/${inputSearch}`);
      setInputSearch("");
      (e.target as HTMLInputElement).blur();
    }
  }
  function onChangeBurgerMenu() {
    setStatusBurger((prev) => {
      return !prev;
    });
  }
  return (
    <header ref={headerRef}>
      <div
        className={`content_header ${statusBurger ? "open_content" : "close_content"}`}
      >
        <Link to={"/"}>
          <h2>ViperFlix</h2>
        </Link>
        <nav className="container_header_nav">
          <Link to={"/collection/movies/trending"}>
            <h5>Фильмы</h5>
          </Link>
          <Link to={"/collection/shows/trending"}>
            <h5>Сериалы</h5>
          </Link>
          <div className="container_input_search">
            <input
              value={inputSearch}
              onChange={onChangeInput}
              onKeyUp={onSendInput}
              type="text"
              placeholder="Поиск"
            />
            <Link to={`search/${inputSearch}`} className="btn_search">
              <img src={imgSearchIcon} alt="img_search_input" />
            </Link>
          </div>
        </nav>
        <nav className="container_burger_menu_btn">
          <button onClick={onChangeBurgerMenu}>
            <img src={imgBurgerMenuIcon} alt="burger_menu_img" />
          </button>
        </nav>
      </div>
      <div className={`container_burger_menu`}>
        <nav
          className={`container_burger_nav ${statusBurger !== null ? (statusBurger ? "open" : "close") : "no_anim"}`}
        >
          <div className="container_input_search">
            <input
              value={inputSearch}
              onChange={onChangeInput}
              onKeyUp={onSendInput}
              type="text"
              placeholder="Поиск"
            />
            <Link to={`search/${inputSearch}`} className="btn_search">
              <img src={imgSearchIcon} alt="img_search_input" />
            </Link>
          </div>
          <Link to={"/collection/movies/trending"}>
            <h5>Фильмы</h5>
          </Link>
          <Link to={"/collection/shows/trending"}>
            <h5>Сериалы</h5>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
