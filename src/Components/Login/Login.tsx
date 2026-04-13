import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useEffect, useState, type ChangeEvent } from "react";

type FormInputsType = {
  login: string;
  password: string;
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
const Login = () => {
  const [formInputs, setFormInputs] = useState<FormInputsType>({
    login: "",
    password: "",
  });
  const [formError, setFormError] = useState<FormInputsType>({
    login: "",
    password: "",
  });
  
  const navigate = useNavigate()

  function onChange(
    e: ChangeEvent<HTMLInputElement>,
    key: keyof FormInputsType,
  ) {
    setFormInputs((prev) => ({ ...prev, [key]: e.target.value }));
  }
  function onBtn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    const cookie = JSON.parse(
      document.cookie.split("userData=")[1],
    ) as CookiesType;
    const user = cookie.data.filter(
      (item) => item.userLogin.login === formInputs.login,
    );

    if (user.length) {
      setFormError((prev) => ({ ...prev, login: "" }));
      if (user[0].userLogin.password === formInputs.password) {
        setFormError((prev) => ({ ...prev, password: "" }));

        cookie.loginStatus = true;
        cookie.userLogin = user[0].userLogin;

        document.cookie = `userData=${JSON.stringify(cookie)}; path=/`;
      } else {
        setFormError((prev) => ({
          ...prev,
          password: "Неправильный пароль",
        }));
      }
    } else {
      setFormError((prev) => ({ ...prev, login: "Неправильный логин" }));
    }
  }
  useEffect(() => {
    const cookie = JSON.parse(
      document.cookie.split("userData=")[1],
    ) as CookiesType;
    if (cookie.loginStatus) {
      navigate("/profile")
    }
  }, []);
  return (
    <section className="section_form">
      <form action="">
        <h2 className="title">Войти в аккаунт АЛАТРА.ТВ</h2>
        <div className="container_input">
          <label>
            <h5>Логин</h5>{" "}
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
          <div className="container_link">
            <button onClick={onBtn}>
              <h5>Войти в АЛАТРА.ТВ</h5>
            </button>
            <Link to="/registr">
              <h6>У вас нету аккаунта?</h6>
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
