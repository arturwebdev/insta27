const { createSlice } = require("@reduxjs/toolkit");

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    allMessages: [],
    activeUserId: "",
    currentDialog: [],
  },
  reducers: {
    toggleActiveUser(state, { payload }) {
      // console.log({...payload});
      state.activeUserId = payload.toId;
      state.currentDialog = state.allMessages.filter(
        (message) =>
          (message.toId === payload.toId && message.fromId === payload.fromId) ||
          (message.toId === payload.fromId && message.fromId === payload.toId)
      );
    },
    addMessages(state, { payload }) {
      const newMessages = {
        id: new Date().getTime().toString(),
        fromId: payload.fromId,
        toId: state.activeUserId,
        text: payload.text,
      };
      state.allMessages.push(newMessages);
      state.currentDialog.push(newMessages);
    },
    removeActiveUser(state) {
      state.activeUserId = "";
      state.currentDialog = [];
    },
  },
});

export const selectMessages = (state) => state.messages;

export const { toggleActiveUser, addMessages, removeActiveUser } =
  messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
