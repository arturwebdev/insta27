const ignoreSpacesInSearch = () => (next) => (action) => {
  if (action.type === "search/toggleSearch") {
    action.payload = action.payload.replaceAll(" ", "");
  }
  next(action);
};
const ignoreUpperTextInSearch = () => (next) => (action) => {
  if (action.type === "search/toggleSearch") {
    action.payload = action.payload.toLowerCase();
  }
  next(action);
};

export default [ignoreSpacesInSearch, ignoreUpperTextInSearch];
