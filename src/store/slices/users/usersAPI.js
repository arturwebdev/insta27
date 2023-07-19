import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { customNumberToString } from "../../../lib/helpers";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async function () {
    const { data: usersData } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const { data: postsData } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos?_limit=500"
    );

    const data = usersData.map((user) => ({
      id: user.id.toString(),
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.address.city.toLowerCase(),
      name: user.name,
      avatar:
        "https://cdn.landesa.org/wp-content/uploads/default-user-image.png",
      followers: customNumberToString(Math.round(Math.random() * 4500 + 500)),
      following: customNumberToString(Math.round(Math.random() * 4500 + 500)),
      bio: user.company.catchPhrase.repeat(3),
      posts: [
        ...postsData
          .filter((post) => post.albumId === user.id)
          .map((post) => ({
            id: post.id + "_" + user.id,
            img: post.url,
            name: user.username,
            likesCount: Math.round(Math.random() * 400 + 500),
            timeAgo: Math.round(Math.random() * 7 + 2) + " Minutes Ago",
            comments: [],
          })),
      ],
    }));
    return data;
  }
);
