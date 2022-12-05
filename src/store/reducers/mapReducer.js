const initialState = {
  notification: null,
  map: null,
  name: null,
  treeData: [
    {
      title: "Kat 1",
      key: "1",
      children: [],
    },
    {
      title: "Kat 2",
      key: "2",
      children: [],
    },
  ],
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_TREE":
      return { ...state, treeData: [...action.payload] };
    case "SET_MAP":
      return { ...state, map: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_NOTIFICATION":
      return { ...state, notification: action.payload };
    default:
      return state;
  }
};

export default mapReducer;
