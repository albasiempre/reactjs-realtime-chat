import axios from "axios";

export const loginCall = async (user, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    // console.log("======loginCall");
    // APIのルーティング設定を参照している
    const response = await axios.post("api/auth/login", user);
    // console.log(res);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    return response;
  } catch (err) {
    dispatch({ type: "LOGIN_ERROR", payload: err });
    return err.response;
  }
};