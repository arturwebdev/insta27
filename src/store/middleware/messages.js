const togglePayloadMessages = (store) => (next) => (action) => {
  if (action.type === "messages/toggleActiveUser") {
    action.payload = {
      fromId: store.getState().users.currentUser.id,
      toId: action.payload,
    };
    
  }
  next(action);
};

export default [togglePayloadMessages];
