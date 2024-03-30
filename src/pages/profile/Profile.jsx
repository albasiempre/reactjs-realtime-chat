import React, { useEffect, useState } from "react";
import "./Profile.css";
import Timeline from "../../components/timeline/Timeline";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
// import axios from "axios";
import { useParams } from "react-router-dom";
import MyPage from "../../components/mypage/MyPage";
import AxiosWrapper from "../../lib/axiosWrapper";

export default function Profile() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  //クエリでusernameを取得してくる。Post.jsから持ってきた。
  const [user, setUser] = useState({});
  const username = useParams().username;
  // console.log(params);

  useEffect(() => {
    const fetchUser = async () => {
      // const res = await axios.get(`users/${post.userId}`);
      //クエリの取得ができてない。
      // const res = await axios.get("/users?username=");
      // const res = await axios.get(`api/users?username=`);
      // console.log("profile 1!?");
      // console.log(username);
      // const urlPath = `api/users?username=${username}`;
      // console.log(urlPath);
      // console.log(typeof urlPath);

      // const res = await axios.get(`api/users?username=${username}`);
      // const res = await axios.get(`api/users?username=${username}`);xx
      const res = await AxiosWrapper.create().get("/api/users?username="+username);

      // const res = await axios.get(urlPath);

      // console.log("profile 2!");
      setUser(res.data);
      // console.log(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              {/* <img
                src={user.coverPicture || PUBLIC_FOLDER + "/post/3.jpeg"} //デフォルト画像は決めてない。
                alt=""
                className="profileCoverImg"
              /> */}
              <img
                src={
                  user.profilePicture
                    ? PUBLIC_FOLDER + user.profilePicture
                    : PUBLIC_FOLDER + "/person/noAvatar.png"
                }
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
              <MyPage />
            </div>
          </div>
          <div className="profileRightBottom">
            {/* <Feed username="" /> */}
            <Timeline username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}