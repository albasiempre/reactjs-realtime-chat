import {
  Bookmark,
  Home,
  Logout,
  MessageRounded,
  Notifications,
  Search,
  Settings,
} from "@mui/icons-material";
import React from "react";
import "./Sidebar.css";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link, useNavigate } from "react-router-dom";


export default function Sidebar() {
  const navigate = useNavigate();

  // ログアウト処理を行う関数
  const handleLogout = () => {
    localStorage.removeItem("user"); // localStorageから"user"を削除
    // console.log(localStorage.getItem('user'));
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Home className="sidebarIcon" />
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <span className="sidebarListItemText">Home</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Search className="sidebarIcon" />
            <span className="sidebarListItemText">Search</span>
          </li>
          <li className="sidebarListItem">
            <Notifications className="sidebarIcon" />
            <span className="sidebarListItemText">Notifications</span>
          </li>
          <li className="sidebarListItem">
            <MessageRounded className="sidebarIcon" />
            <Link to="/messenger" style={{ textDecoration: "none", color: "black" }}>
              <span className="sidebarListItemText">DM</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />

            <span className="sidebarListItemText">Bookmark</span>
          </li>
          {/* <li className="sidebarListItem">
            <Person className="sidebarIcon" />
            <Link
              to="/profile/:username"
              style={{ textDecoration: "none", color: "black" }}
            >
              <span className="sidebarListItemText">Profile</span>
            </Link>
          </li> */}
          <li className="sidebarListItem">
            <Settings className="sidebarIcon" />
            <span className="sidebarListItemText">Settings</span>
          </li>
          <li className="sidebarListItem" onClick={handleLogout}>
            <Logout className="sidebarIcon" />
              <span className="sidebarListItemText">Logout</span>
          </li>
        </ul>
        {/* <hr className="sidebarHr" /> */}
        <ul className="sidebarFriendList">
          {/* <li className="sidebarFriend">
            <img
              src="./assets/person/2.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName"></span>
          </li> */}
          <div className="sidebarFriendsSuggest">もしかしたら知り合い？</div>
          {Users.map((user) => (
            <CloseFriend key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
}