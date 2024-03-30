import React, { useContext, useRef } from "react";
import "./Login.css";
import { loginCall } from "../../apiCalls";
//AuthContextはユーザー状態が入ってる(user, isFetching, error, dispatch)
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { CircularProgress } from "@mui/material";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext);

  // イベントの取得によって、リロードをしない（入力項目を残す）
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email.current.value);
    // ApiCallsの関数を参照
    // console.log("loginCall");
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch

    ).then(response => {

      console.log(response);
      const username = response.data.username;
      navigate(`/profile/${username}`); // ログイン成功後にホーム画面へ遷移
    }).catch(err => {
      console.log(err);
    });
  };

  // console.log(user); //ユーザーがログインしてる状態
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Healsyn</h3>
          <span className="loginDesc">ヘルスケアの世界をオープンに。</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
            <p className="loginMsg">ログインはこちら</p>
            <input
              type="email"
              className="loginInput"
              placeholder="Eメール"
              required
              ref={email}
            />
            <input
              type="password"
              className="loginInput"
              required
              minLength="8"
              placeholder="パスワード"
              ref={password}
            />
            <div className="loginCover">
              <div className="hasAccount">
                <button className="loginButton">ログイン
                </button>
                <Link to="/"><p className="loginForgot">パスワードを忘れた方へ</p></Link>
              </div>
              <Link to="/register"><button className="loginRegisterButton">アカウント作成
              </button></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}