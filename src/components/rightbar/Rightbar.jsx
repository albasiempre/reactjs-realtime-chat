import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import "./Rightbar.css";

export default function Rightbar({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [followed, setFollowed] = useState(false);

  const { user: currentUser, dispatch } = useContext(AuthContext);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?.id));
  }, [currentUser, user?.id, dispatch]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
      } else {
        await axios.put(`/users/${user._id}/follow`);
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <span className="birthdayText">
            <b>ユーザー限定</b> イベント開催中！
          </span>
        </div>
        <img className="rightbarAd" src="assets/promotion/ad.jpeg" alt="" />
        <h4 className="rightbarTitle">オンラインの知り合い</h4>
        <ul className="rightbarFriendList">
          {/* <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img
                className="rightbarProfileImg"
                src="assets/person/3.jpeg"
                alt=""
              />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">akihisa</span>
          </li> */}
          {Users.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </ul>
        <p className="promotionTitle">プロモーション広告</p>
        <img
          className="rightbarPromotionImg"
          src="assets/promotion/promotion1.jpeg"
          alt=""
        />
        <p className="promotionName">資産運用コンサル</p>
        <img
          className="rightbarPromotionImg"
          src="assets/promotion/promotion2.jpeg"
          alt=""
        />
        <p className="promotionName">医療機器の管理SaaS</p>
        <img
          className="rightbarPromotionImg"
          src="assets/promotion/promotion3.jpeg"
          alt=""
        />
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {/* フォロー機能時に追加 */}
        {user.username !== currentUser.username && (
          <button
            className="rightbarFollowButton"
            onClick={() => handleClick()}
          >
            {followed ? "フォローを外す" : "フォロー"}
            {followed ? <Remove /> : <Add />}
            {/* フォロー
            <Add /> */}
          </button>
        )}
        <h4 className="rightbarTitle">ユーザー情報</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Base:</span>
            <span className="rightbarInfoKey">Tokyo, Japan</span>
          </div>
          <h4 className="rightbarTitle">あなたの友達</h4>
          <div className="rightbarFollowings">
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/1.jpeg"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">akihisa</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/2.jpeg"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">John</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/3.jpeg"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">Katie</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/4.jpeg"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">James</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/5.jpeg"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">Jacob</span>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}