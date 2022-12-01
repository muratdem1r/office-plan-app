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

export const selectPlan = (selectedName) => (dispatch, getState) => {
  getState().selectedLayerGroup?.setVisible(false);

  const allLayerGroups = getState().map?.getLayers().array_;

  const newSelected = allLayerGroups.find((layerGroup) => {
    const name = layerGroup.get("name");

    if (selectedName === name) {
      return layerGroup;
    }
    return null;
  });

  if (newSelected) {
    newSelected.setVisible(true);
    dispatch({ type: SELECTED_PLAN, payload: newSelected });
  }
};

export const newPlan = (layerGroup) => (dispatch, getState) => {
  let isUnique = true;

  const name = layerGroup.get("name");
  const floor = layerGroup.get("floor");

  getState().offices.forEach((office) => {
    if (office.name === name) {
      isUnique = false;
    }
  });
  if (isUnique) {
    dispatch({ type: NEW_PLAN, payload: { name, floor } });

    getState().map.addLayer(layerGroup);

    dispatch(selectPlan(name));

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
