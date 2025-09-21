import "./Footer.css";
import telegramImg from "../../../../public/img/icon/icons8-телеграм-48.png";
import githubImg from "../../../../public/img/icon/github.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer>
      <div className="container_footer">
        <div className="container_column">
          <h3>ViperrFlix</h3>
          <div className="container_flex">
            <h6>omdbapi</h6>
            <h6>api.trakt</h6>
          </div>
        </div>
        <div className="container_column">
          <div className="container_flex links">
            <Link to={"collection/movies/trending"}>
              <h5>Фильмы</h5>
            </Link>
            <Link to={"collection/shows/trending"}>
              <h5>Сериалы</h5>
            </Link>
          </div>
          <div className="container_flex links">
            <a href="#">
              <img src={telegramImg} alt="" />
              <h5>Telegram</h5>
            </a>
            <a href="#">
              <img src={githubImg} alt="github_img" />
              <h5>GitHub</h5>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
