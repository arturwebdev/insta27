import React, { useRef } from "react";
import IMAGES from "../../images";
import "./CreatePost.css";
import { useDispatch } from "react-redux";
import { addPost } from "../../store/middleware/posts";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const [{ value: img }, { value: postText }] = formRef.current;
    dispatch(addPost({ img, postText }));
    navigate("/");
    formRef.current.reset();
  };
  return (
    <div
      style={{ marginTop: "100px", textAlign: "center" }}
      className="container"
    >
      <h1 style={{ fontSize: "50px" }}>Create Post</h1>
      <br />
      <img
        style={{ margin: "auto" }}
        width="100px"
        src={IMAGES.createPost}
        alt=""
      />
      <br />
      <form ref={formRef} onSubmit={handleSubmit} style={{ marginTop: "50px" }}>
        <input type="text" placeholder="img" />
        <br />
        <input type="text" placeholder="desc" />
        <br />
        <label className="input-file">
          <input style={{ display: "none" }} type="submit" name="file" />
          <span>Выберите файл</span>
        </label>
      </form>
    </div>
  );
};

export default CreatePost;
