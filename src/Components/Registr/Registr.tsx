import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

type FormInputsType = {
  login: string;
  email: string;
  password: string;
  returnPassword: string;
};
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
const Registr = () => {
  const navigate = useNavigate();
  const [formInputs, setFormInputs] = useState<FormInputsType>({
    login: "",
    email: "",
    password: "",
    returnPassword: "",
  });
  const [formError, setFormError] = useState<FormInputsType>({
    login: "",
    email: "",
    password: "",
    returnPassword: "",
  });
  function onChange(
    e: ChangeEvent<HTMLInputElement>,
    key: keyof FormInputsType,
  ) {
    setFormInputs((prev) => ({ ...prev, [key]: e.target.value }));
  }
  function onBtn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    const login = formInputs.login;
    const email = formInputs.email;
    const password = formInputs.password;
    const returnPassword = formInputs.returnPassword;

    const status = {
      login: false,
      email: false,
      password: false,
      returnPassword: false,
    };

    if (login.length < 8) {
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
    if (email.length === 0) {
      setFormError((prev) => ({
        ...prev,
        email: "Почта не заполнена",
      }));
    } else if (!email.includes("@")) {
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
    if (password.length < 8) {
      setFormError((prev) => ({
        ...prev,
        password: "В пароле должно быть больше 8 символов",
      }));
    } else if (password.split("").filter((item) => !isNaN(+item)).length <= 0) {
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
      if (returnPassword !== password) {
        setFormError((prev) => ({
          ...prev,
          password: "Пороли не совпадают",
          returnPassword: "Пороли не совпадают",
        }));
      } else {
        setFormError((prev) => ({
          ...prev,
          password: "",
          returnPassword: "",
        }));
        status.returnPassword = true;
      }
    }

    if (
      status.login &&
      status.password &&
      status.email &&
      status.returnPassword
    ) {
      const cookie = JSON.parse(
        document.cookie.split("userData=")[1],
      ) as CookiesType;

      if (
        cookie.data.filter((item) => item.userLogin.login === login).length ===
        0
      ) {
        const today = new Date();
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const time24 = `${hours}:${minutes.toString().padStart(2, "0")}`;
        const formattedDate = today.toISOString().split("T")[0] + " " + time24;

        cookie.loginStatus = true;
        cookie.userLogin = {
          name: login,
          login: login,
          email: email,
          password: password,
          date: formattedDate,
        };
        cookie.data = [
          ...cookie.data,
          {
            userLogin: {
              name: login,
              login: login,
              email: email,
              password: password,
              date: formattedDate,
            },
            favorite: [],
            countView: 0,
          },
        ];

        document.cookie = `userData=${JSON.stringify(cookie)}; path=/`;
        navigate("/");
      } else {
        setFormError((prev) => ({ ...prev, login: "Логин занят" }));
      }
    }
  }
  useEffect(() => {
    if (document.cookie.length > 0) {
      const cookie = JSON.parse(
        document.cookie.split("userData=")[1],
      ) as CookiesType;
      if (cookie.loginStatus) {
        navigate("/");
      }
    }
  }, []);
  return (
    <section className="section_form">
      <form action="">
        <h2 className="title">Регистраця в АЛАТРА.ТВ</h2>
        <div className="container_input">
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
              value={formInputs.login}
              onChange={(e) => onChange(e, "login")}
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
              value={formInputs.email}
              onChange={(e) => onChange(e, "email")}
              type="email"
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
              value={formInputs.password}
              onChange={(e) => onChange(e, "password")}
              type="password"
            />
          </label>
          <label>
            <h5>Повторить пароль</h5>
            {formError.returnPassword.length ? (
              <h6>{formError.returnPassword}</h6>
            ) : (
              ""
            )}
            <input
              style={
                formError.returnPassword.length
                  ? {
                      color: "red",
                      border: "1.5px solid rgba(255, 0, 0, 0.405)",
                    }
                  : {}
              }
              value={formInputs.returnPassword}
              onChange={(e) => onChange(e, "returnPassword")}
              type="password"
            />
          </label>
          <div className="container_link">
            <button onClick={onBtn}>
              <h5>Создать АЛАТРА.ТВ</h5>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Registr;
