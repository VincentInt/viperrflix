import "./Footer.css";
import telegramImg from "../../../../public/img/icon/icons8-телеграм-48.png";
import githubImg from "../../../../public/img/icon/github.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
type CookiesType = {
  loginStatus: boolean;
  userLogin: { login: string; password: string };
  data: { login: string; password: string }[];
};

const Footer = () => {
  const [login, setLogin] = useState<string>("");
  useEffect(() => {
    if (document.cookie.length > 0) {
      const cookie = JSON.parse(
        document.cookie.split("userData=")[1],
      ) as CookiesType;
      if (cookie.loginStatus) {
        setLogin(cookie.userLogin.login);
      } else {
        setLogin("");
      }
    }
  }, [document.cookie]);
  return (
    <footer>
      <div className="container_footer">
        <div className="container_column">
          <h2>АЛАТРА.ТВ</h2>
          <div className="container_flex">
            <h6>omdbapi</h6>
            <h6>api.trakt</h6>
          </div>
        </div>
        <div className="container_column">
          <div className="container_flex links">
            <Link to={"/"}>
              <h6>Главная</h6>
            </Link>
            <Link to={"/compilation"}>
              <h6>Подборка</h6>
            </Link>
            <Link to={"/favorite"}>
              <h6>Избранное</h6>
            </Link>
            {login.length ? (
              <Link to={"/profile"}>
                <h6>{login}</h6>
              </Link>
            ) : (
              <Link to={"/login"}>
                <h6>Войти</h6>
              </Link>
            )}
          </div>
          <div className="container_flex links">
            <a target="_" href="https://t.me/ICE_ALABASTER_812">
              <img src={telegramImg} alt="" />
              <h6>Telegram</h6>
            </a>
            <a target="_" href="https://github.com/VincentInt/viperrflix">
              <img src={githubImg} alt="github_img" />
              <h6>GitHub</h6>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
