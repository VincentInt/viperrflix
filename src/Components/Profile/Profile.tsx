import "./Profile.css";
import doneImg from "../../../public/img/icon/icons8-галочка-24.png";
import { useEffect, useState, type ChangeEvent } from "react";
import dataMovies from "../../utils/data/dataMovies";
import { useNavigate } from "react-router-dom";

type FormInputsType = {
  name: string;
  login: string;
  email: string;
  password: string;
  [key: string]: string;
};
type CookieType = {
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

const Profile = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useState<CookieType>();
  const [favoriteGenres, setFavoriteGenres] = useState<string>("");
  const [formInputs, setFormInputs] = useState<FormInputsType>({
    name: "",
    login: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState<FormInputsType>({
    name: "",
    login: "",
    email: "",
    password: "",
  });
  const [statusEdit, setStatusEdit] = useState<boolean>(false);

  function onChange(
    e: ChangeEvent<HTMLInputElement>,
    key: keyof FormInputsType,
  ) {
    setFormInputs((prev) => ({ ...prev, [key]: e.target.value }));
  }
  function onBtn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    const name = formInputs.name;
    const login = formInputs.login;
    const email = formInputs.email;
    const password = formInputs.password;

    const status = {
      name: false,
      login: false,
      email: false,
      password: false,
    };
    if (name.length !== 0 && name.length < 8) {
      setFormError((prev) => ({
        ...prev,
        name: "В имени должно быть больше 8 символов",
      }));
    } else if (name.split("").filter((item) => !isNaN(+item)).length > 0) {
      setFormError((prev) => ({
        ...prev,
        name: "В логине допустимы только буквы",
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        name: "",
      }));
      status.name = true;
    }
    if (login.length !== 0 && login.length < 8) {
      setFormError((prev) => ({
        ...prev,
        login: "В логине должно быть больше 8 символов",
      }));
    } else if (login.split("").filter((item) => !isNaN(+item)).length > 0) {
      setFormError((prev) => ({
        ...prev,
        login: "В логине допустимы только буквы",
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        login: "",
      }));
      status.login = true;
    }
    if (email.length !== 0) {
      if (!email.includes("@")) {
        setFormError((prev) => ({
          ...prev,
          email: "В почте должен быть символ '@'",
        }));
      } else {
        setFormError((prev) => ({
          ...prev,
          email: "",
        }));
        status.email = true;
      }
    } else {
      setFormError((prev) => ({
        ...prev,
        email: "",
      }));
      status.email = true;
    }
    if (password.length !== 0) {
      if (password.length < 8) {
        setFormError((prev) => ({
          ...prev,
          password: "В пароле должно быть больше 8 символов",
        }));
      } else if (
        password.split("").filter((item) => !isNaN(+item)).length <= 0
      ) {
        setFormError((prev) => ({
          ...prev,
          password: "В пароле должны быть цифры",
        }));
      } else if (
        password
          .split("")
          .filter(
            (item) =>
              item === "_" || item === "-" || item === "&" || item === "?",
          ).length <= 0
      ) {
        setFormError((prev) => ({
          ...prev,
          password: `В пароле должны быть символы "_ - & ?"`,
        }));
      } else {
        setFormError((prev) => ({
          ...prev,
          password: "",
        }));
        status.password = true;
      }
    } else {
      setFormError((prev) => ({
        ...prev,
        password: "",
      }));
      status.password = true;
    }

    if (status.name && status.login && status.email && status.password) {
      const cookieElem = cookies?.data.filter(
        (item) => item.userLogin.login === cookies.userLogin.login,
      )[0];
      const today = new Date();
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const time24 = `${hours}:${minutes.toString().padStart(2, "0")}`;
      const formattedDate = today.toISOString().split("T")[0] + " " + time24;

      let edit = false;

      if (cookieElem) {
        if (formInputs.name.length) {
          cookieElem.userLogin.name = formInputs.name;
          cookieElem.userLogin.date = formattedDate;
          edit = true;
        }
        if (formInputs.login.length) {
          cookieElem.userLogin.login = formInputs.login;
          cookieElem.userLogin.date = formattedDate;
          edit = true;
        }
        if (formInputs.email.length) {
          cookieElem.userLogin.email = formInputs.email;
          cookieElem.userLogin.date = formattedDate;
          edit = true;
        }
        if (formInputs.password.length) {
          cookieElem.userLogin.password = formInputs.password;
          cookieElem.userLogin.date = formattedDate;
          edit = true;
        }

        const cookiesClone = cookies;

        cookiesClone.userLogin = cookieElem.userLogin;
        cookiesClone.data = cookiesClone.data.map((item) => {
          if (item.userLogin.login === cookies.userLogin.login) {
            return {
              userLogin: cookieElem.userLogin,
              countView: cookies.countView,
              favorite: cookies.favorite,
            };
          } else return item;
        });
        document.cookie = `userData=${JSON.stringify(cookiesClone)}; path=/`;
        if (edit) {
          setStatusEdit(true);
          setFormInputs({
            name: "",
            login: "",
            email: "",
            password: "",
          });
        }
      }
    }
  }
  function onExit() {
    if (cookies) {
      const cookiesClone = cookies;
      ((cookiesClone.userLogin = {
        name: "",
        login: "",
        password: "",
        email: "",
        date: "",
      }),
        (cookiesClone.countView = 0));
      cookiesClone.favorite = [];
      cookies.loginStatus = false;
      document.cookie = `userData=${JSON.stringify(cookiesClone)}; path=/`;
      navigate("/");
    }
  }
  function onDelete() {
    if (cookies) {
      const cookiesClone = cookies;
      cookiesClone.data = cookiesClone.data.filter((item) => {
        return item.userLogin.login !== cookiesClone.userLogin.login;
      });
      ((cookiesClone.userLogin = {
        name: "",
        login: "",
        password: "",
        email: "",
        date: "",
      }),
        (cookiesClone.countView = 0));
      cookiesClone.favorite = [];
      cookies.loginStatus = false;
      document.cookie = `userData=${JSON.stringify(cookiesClone)}; path=/`;
      navigate("/");
    }
  }
  useEffect(() => {
    setCookies(JSON.parse(document.cookie.split("userData=")[1]));
  }, [document.cookie]);
  useEffect(() => {
    if (cookies) {
      const data = [
        ...dataMovies.trending,
        ...dataMovies.popular,
        ...dataMovies.anticipated,
      ];
      const genrePopular: any = {};

      cookies.favorite
        .map((item) => {
          return data.filter(
            (itemFilter) => itemFilter.ids.trakt.toString() === item,
          )[0];
        })
        .forEach((item) => {
          item.genres.forEach((item: string) => {
            if (genrePopular[item] !== undefined) {
              genrePopular[item] = genrePopular[item] + 1;
            } else {
              genrePopular[item] = 1;
            }
          });
        });

      let max = 0;
      let genres = "";
      for (const key in genrePopular) {
        if (max < genrePopular[key]) {
          max = genrePopular[key];
          genres = key;
        }
      }
      setFavoriteGenres(genres);
    }
  }, [cookies]);
  return (
    <section className="section_collection">
      <div className="container_profile">
        <div className="profile">
          <div className="container_flex">
            <div className="container_info">
              <h3>Настройка профиля</h3>
              <label>
                <h5>Отображаемое имя</h5>
                {formError.name.length ? <h6>{formError.name}</h6> : ""}
                <input
                  style={
                    formError.name.length
                      ? {
                          color: "red",
                          border: "1.5px solid rgba(255, 0, 0, 0.405)",
                        }
                      : {}
                  }
                  onChange={(e) => onChange(e, "name")}
                  value={formInputs.name}
                  placeholder={cookies?.userLogin.name}
                  type="text"
                />
              </label>
              <label>
                <h5>Логин</h5>
                {formError.login.length ? <h6>{formError.login}</h6> : ""}
                <input
                  style={
                    formError.login.length
                      ? {
                          color: "red",
                          border: "1.5px solid rgba(255, 0, 0, 0.405)",
                        }
                      : {}
                  }
                  onChange={(e) => onChange(e, "login")}
                  value={formInputs.login}
                  placeholder={cookies?.userLogin.login}
                  type="text"
                />
              </label>
              <label>
                <h5>Почта</h5>
                {formError.email.length ? <h6>{formError.email}</h6> : ""}
                <input
                  style={
                    formError.email.length
                      ? {
                          color: "red",
                          border: "1.5px solid rgba(255, 0, 0, 0.405)",
                        }
                      : {}
                  }
                  onChange={(e) => onChange(e, "email")}
                  value={formInputs.email}
                  placeholder={cookies?.userLogin.email}
                  type="text"
                />
              </label>
              <label>
                <h5>Пароль</h5>
                {formError.password.length ? <h6>{formError.password}</h6> : ""}
                <input
                  style={
                    formError.password.length
                      ? {
                          color: "red",
                          border: "1.5px solid rgba(255, 0, 0, 0.405)",
                        }
                      : {}
                  }
                  onChange={(e) => onChange(e, "password")}
                  value={formInputs.password}
                  placeholder="**************"
                  type="password"
                />
              </label>
              <label>
                <h5>Последние изменения</h5>
                <h5>{cookies?.userLogin.date}</h5>
              </label>
              {statusEdit ? (
                <div className="container_done">
                  <img src={doneImg} alt="done_img" />
                  <h6>Изменения сохранены</h6>
                </div>
              ) : (
                ""
              )}
              <div className="container_btn">
                <button onClick={onBtn}>
                  <h5>Сохранить изменения</h5>
                </button>
                <button onClick={onExit}>
                  <h5>Выйти</h5>
                </button>
                <button onClick={onDelete}>
                  <h5>Удалить</h5>
                </button>
              </div>
            </div>
            <div className="container_statistic">
              <div className="statistic">
                <h3>Статистика</h3>
                <label>
                  <h5>Избранных фильмов</h5>
                  <h3>{cookies?.favorite.length}</h3>
                </label>
                <label>
                  <h5>Просмотренно фильмов</h5>
                  <h3>{cookies?.countView}</h3>
                </label>
                <label>
                  <h5>Любимый жанр</h5>
                  <h3>{favoriteGenres ? favoriteGenres : "Нету"}</h3>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
