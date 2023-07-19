import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersAPI";

const usersSlice = createSlice({
  name: "user",
  initialState: {
    usersData: [],
    currentUser: null,
  },
  reducers: {
    addPost(state, { payload }) {
      const idx = state.usersData.findIndex(
        (user) => user.id === state.currentUser.id
      );
      state.usersData[idx].posts.unshift(payload);
      state.currentUser.posts.unshift(payload);
    },
    delPost(state, { payload }) {
      const idx = state.usersData.findIndex(
        (user) => user.id === state.currentUser.id
      );

      state.usersData[idx].posts = state.usersData[idx].posts.filter(post => post.id !== payload)
      state.currentUser.posts = state.currentUser.posts.filter(post => post.id !== payload);
    },
    logIn(state, { payload }) {
      const foundUser = state.usersData.find(
        (user) =>
          (user.username === payload.username &&
            user.password === payload.password) ||
          (user.email === payload.username &&
            user.password === payload.password)
      );
      state.currentUser = foundUser || null;
    },
    logOut(state) {
      state.currentUser = null;
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled]: (state, { payload }) => {
      state.usersData.push(...payload);
    },
  },
});

export const selectUsers = (state) => state.users;

export const { logIn, logOut, addPost, delPost } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
