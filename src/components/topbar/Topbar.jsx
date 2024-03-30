import React, { useContext, useState } from "react";
import "./Topbar.css";
import {
  Chat,
  Notifications,
  Search,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim()) {
      try {
        const res = await axios.get(`/users/search?term=${e.target.value.trim()}`);
        setSearchResults(res.data);
      } catch (err) {
        console.error("ユーザー検索中にエラーが発生しました。", err);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Healsyn</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            type="text"
            className="searchInput"
            placeholder="医師、パートナー、プロジェクトを探す"
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchResults.length > 0 && (
            <div className="searchResults">
              {searchResults.map((result) => (
                <Link key={result._id} to={`/profile/${result.username}`} style={{ textDecoration: "none" }}>
                  <div className="searchResultItem">{result.username}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
          <Link to={`/messenger/${user.username}`} style={{ textDecoration: "none" }}>
            <Chat />
            <span className="topbarIconBadge">2</span>
          </Link>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PUBLIC_FOLDER + user.profilePicture
                  : PUBLIC_FOLDER + "person/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}