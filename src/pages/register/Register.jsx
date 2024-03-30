import axios from "axios";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const username = useRef();
  const email = useRef();
  // const org = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    //パスワードと確認用パスワードが合っているかどうか確認
    if (password.current.value !== passwordConfirmation.current.value) {
      passwordConfirmation.current.setCustomValidity("パスワード違います");
    } else {
      try {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        //registerAPIを叩く
        await axios.post("api/auth/register", user);
        // console.log(response);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Healsyn</h3>
          <span className="loginDesc">ヘルスケアの世界をオープンに。</span>
          {/* <img className="topImage" src="/public/assets/person/top.jpg"> */}
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleClick(e)}>
            <p className="loginMsg">新規登録はこちら</p>
            <input
              type="text"
              className="loginInput"
              placeholder="ユーザー名"
              required
              ref={username}
            />
            <input
              type="email"
              className="loginInput"
              placeholder="Eメール"
              required
              ref={email}
            />
            {/* <input
              type="org"
              className="loginInput"
              placeholder="org"
              required
              ref={org}
            /> */}
            <input
              type="password"
              className="loginInput"
              placeholder="パスワード"
              required
              minLength="6"
              ref={password}
            />
            <input
              type="password"
              className="loginInput"
              placeholder="確認用パスワード"
              required
              minLength="6"
              ref={passwordConfirmation}
            />
            <button className="loginButton" type="submit">
              サインアップ
            </button>
            <div className="buttonWrapper">
              <Link to="/login"><button className="SignupRegisterButton">Login（アカウントをお持ちの方）</button></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}