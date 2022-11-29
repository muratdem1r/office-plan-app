const initialState = {
  imageLayer: null,
  vectorLayer: null,
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_IMAGE_LAYER":
      return state;
    default:
      return state;
  }
};

export default mapReducer;
