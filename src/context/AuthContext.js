import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

//最初のユーザー状態の定義
const initialState = {
  // user: null, //ログインしてない
  // user: {
  //   _id: "62301ab54ded0ed0584598e4",
  //   username: "akihisa",
  //   email: "alba.siemple@gmail.com",
  //   password: "abcdefg",
  //   profilePicture: "/person/1.jpg",
  //   coverPicture: "",
  //   followers: [],
  //   followings: [],
  //   isAdmin: false,
  // },
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  //ユーザー入力によって状態(state)が更新され、それをグローバルに利用している。
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //set user data in local storage
  useEffect(() => {

    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  // console.log("====state");
  // console.log(state);

  return (
    // 実際にここでAuthContextを共有する
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
    // childrenはAppに相当する
  );
};