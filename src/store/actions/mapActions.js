import {
  SELECTED_PLAN,
  NEW_PLAN,
  NEW_MAP,
  CHANGE_FLOOR,
  SET_NOTIFICATION,
  ADD_FLOOR,
} from "store/types/mapTypes";

export const newMap = (map) => (dispatch) => {
  dispatch({ type: NEW_MAP, payload: map });
};

export const selectPlan = (layerGroup) => (dispatch, getState) => {
  getState().selectedLayerGroup?.setVisible(false);
  layerGroup.setVisible(true);
  dispatch({ type: SELECTED_PLAN, payload: layerGroup });
};

export const newPlan = (layerGroup) => (dispatch, getState) => {
  let isUnique = true;

  const name = layerGroup.get("name");

  getState().names.forEach((value) => {
    if (value === name) {
      isUnique = false;
    }
  });
  if (isUnique) {
    dispatch({ type: NEW_PLAN, payload: name });

    getState().map.addLayer(layerGroup);

    dispatch(selectPlan(layerGroup));

    return true;
  } else {
    return false;
  }
};

export const changeFloor = (floor) => (dispatch, getState) => {
  const checkEmptyFloor = getState()
    .map.getLayers()
    .array_.every((layerGroup) => {
      if (layerGroup.get("floor") === floor) {
        dispatch(selectPlan(layerGroup));
        return false;
      }
      return true;
    });

  if (checkEmptyFloor) {
    return true;
  } else {
    dispatch({ type: CHANGE_FLOOR, payload: floor });
  }
};

export const addFloor = () => (dispatch) => {
  dispatch({ type: ADD_FLOOR });
};

export const setNotification = (info) => (dispatch) => {
  dispatch({ type: SET_NOTIFICATION, payload: info });
};
