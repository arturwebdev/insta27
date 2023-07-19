import { type } from "@testing-library/user-event/dist/type";
import { addPost as addPostUsers } from "../slices/users/userSlice";
import { delPost as delPostUsers } from "../slices/users/userSlice";
const ignoreEmptyComments = (store) => (next) => (action) => {
  if (action.type === "posts/addComment" && !action.payload.body.trim()) {
    return;
  }
  next(action);
};

const addPostMiddleware = (store) => (next) => (action) => {
  if (action.type === "addPost") {
    const newPost = {
      id: new Date().getTime().toString(),
      img: action.payload.img,
      name: store.getState().users.currentUser.username,
      postText: action.payload.postText,
      likesCount: Math.round(Math.random() * 400 + 500),
      timeAgo: 0 + " Minutes Ago",
      comments: [],
    };
    store.dispatch(addPostUsers(newPost));
    store.dispatch({ type: "posts/addPost", payload: newPost });
    return;
  }
  next(action);
};

export function addPost(payload) {
  return { type: "addPost", payload };
}

const delPostMiddleware = (store) => (next) => (action) => {
  if (action.type === "delPost") {
    store.dispatch(delPostUsers(action.payload));
    store.dispatch({ type: "posts/delPost", payload: action.payload });
    return;
  }
  next(action);
};

export function delPost(payload) {
  return { type: "delPost", payload };
}

export default [ignoreEmptyComments, addPostMiddleware, delPostMiddleware];
