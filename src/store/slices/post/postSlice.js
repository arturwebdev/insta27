import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./postApi";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    isLoading: false,
    data: [],
  },
  reducers: {
    addComment(state, { payload: { postId, username, body } }) {
      const idx = state.data.findIndex((el) => el.id === postId);
      state.data[idx].comments.push({
        id: new Date().getTime().toString(),
        username,
        body,
      });
    },
    addPost(state, { payload }) {
      state.data.unshift(payload);
    },
    delPost(state, { payload }) {
      // const idx = state.data.findIndex((el) => el.id === payload);
      state.data = state.data.filter((el) => el.id !== payload);
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPosts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
  },
});

export const selectPosts = (state) => state.posts;

export const { addComment, delPost } = postSlice.actions;

export const postReducer = postSlice.reducer;
