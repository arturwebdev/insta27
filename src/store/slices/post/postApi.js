import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async function () {
    const { data: postsData } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos?_limit=100"
    );

    const { data: commentsData } = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );

    const data = postsData.map((post) => ({
      id: post.id.toString(),
      img: post.url,
      name: post.title.split(" ")[0],
      postText: post.title.split(" ").slice(1).join(" "),
      likesCount: Math.round(Math.random() * 400 + 500),
      timeAgo: Math.round(Math.random() * 7 + 2) + " Minutes Ago",
      comments: [
        ...commentsData
          .filter((comment) => comment.postId === post.id)
          .map((comment) => ({
            id: comment.id.toString(),
            username: comment.email.split("@")[0].toLowerCase(),
            body: comment.body,
          })),
      ],
    }));
    return data;
  }
);
