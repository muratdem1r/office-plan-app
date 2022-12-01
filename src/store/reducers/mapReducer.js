const initialState = {
  notification: null,
  map: null,
  names: [],
  floors: [1, 2, 3, 4],

  selectedName: null,
  selectedFloor: null,
  selectedLayerGroup: null,
  selectedOfficeLayer: null,
  selectedVectorLayer: null,
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_MAP":
      return { ...state, map: action.payload };
    case "CHANGE_FLOOR":
      return { ...state, selectedFloor: action.payload };
    case "ADD_FLOOR":
      // last index's value +1
      const newFloor = state.floors[state.floors.length - 1] + 1;

      return { ...state, floors: [...state.floors, newFloor] };
    case "NEW_PLAN":
      return { ...state, names: [...state.names, action.payload] };
    case "SELECTED_PLAN":
      return {
        ...state,
        selectedLayerGroup: action.payload,
        selectedOfficeLayer: action.payload.getLayers().item(0),
        selectedVectorLayer: action.payload.getLayers().item(1),
        selectedName: action.payload.get("name"),
        selectedFloor: action.payload.get("floor"),
      };
    case "SET_NOTIFICATION":
      return { ...state, notification: action.payload };
    default:
      return state;
  }
};

export default mapReducer;
