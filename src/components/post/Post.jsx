import { MoreVert } from "@mui/icons-material";
// import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
// import { Users } from "../../dummyData";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AxiosWrapper from "../../lib/axiosWrapper";

export default function Post({ post }) {
  const [open, setOpen] = useState(false); // モーダルの開閉状態
  const [editContent, setEditContent] = useState(""); // 編集中の投稿内容
  const [like, setLike] = useState(post.likes ? post.likes.length : 0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  // 以下のようにプロパティ名を変更する、以下はログイン中のユーザー名
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      // const res = await axios.get(`/users/${post.userId}`);
      const res = await AxiosWrapper.create().get(`/api/users?userId=${post.userId}`);
      setUser(res.data);
      // console.log(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const handleLike = async () => {
    try {
      //いいねのAPIを叩く
      await AxiosWrapper.create().put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
     // モーダルを開く
  const handleOpen = () => {
      setEditContent(post.desc); // 現在の投稿内容を編集用の状態にセット
      setOpen(true);
  }

  // モーダルを閉じる
  const handleClose = () => {
    setOpen(false);
  };

    // 投稿の編集
    const handleEdit = async () => {
      try {
        // 編集APIを叩く（例: PUT /posts/{post._id}）
        const response = await AxiosWrapper.create().put(`posts/${post._id}`, { desc: editContent });
        if (response.data.desc !== post.desc) {
          // 新しい内容でpostの状態を更新
          post.desc = response.data.desc;
        }
        handleClose(); // モーダルを閉じる
        // 成功した場合の処理（例: 状態の更新や通知）
      } catch (err) {
        console.log(err);
      }
  };
 
  // 投稿の削除
const handleDelete = async () => {
  if (currentUser._id !== post.userId) {
      alert("自分の投稿のみ削除できます。");
      return;
  }
  try {
      // 削除APIを叩く（例: DELETE /posts/{post._id}）
      await AxiosWrapper.create().delete(`/posts/${post._id}`);
      // 成功した場合の処理（例: 状態の更新や通知）
      // ここで例えば、投稿リストから削除された投稿をフィルタリングするなどの処理を追加できます
  } catch (err) {
      console.log(err);
  }
};

   // モーダルのスタイル
   const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: 500,
    fontSize: '20px',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PUBLIC_FOLDER + user.profilePicture
                    : PUBLIC_FOLDER + "person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <div className="postTopLeftDetail">
              <span className="postUsername">{user.username}</span>
              <span className="postUserOrg">{user.org}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
          </div>
          <div className="postTopRight">
          <MoreVert onClick={handleOpen} /> {/* 編集・削除ボタン */}
          <Modal
            className="postModal"
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
            <textarea
              className="textareaModal"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="buttonsModal">
            <button className="buttonSave" onClick={handleEdit}>保存</button>
            <button className="buttonDelete" onClick={handleDelete}>削除</button>
            </div>
          </Box>
          </Modal>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img className="postImg" src={PUBLIC_FOLDER + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={PUBLIC_FOLDER + "/heart.png"}
              alt=""
              onClick={() => handleLike()}
            />
            <span className="postLikeCounter">
              {like}人がいいねを押しました
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}:コメント</span>
          </div>
        </div>
      </div>
    </div>
  );
}