import { createView } from "map/helpers/createView";
import {
  SET_MAP,
  SET_NAME,
  SET_NOTIFICATION,
  UPDATE_TREE,
} from "store/types/mapTypes";

export const newMap = (map) => (dispatch) => {
  dispatch({ type: SET_MAP, payload: map });
};

export const changeName = (name) => (dispatch) => {
  dispatch({ type: SET_NAME, payload: name });
};

export const setNotification = (info) => (dispatch) => {
  dispatch({ type: SET_NOTIFICATION, payload: info });
};

export const addFloor = () => (dispatch, getState) => {
  const { treeData } = getState();
  const lastIndex = treeData.length - 1;
  const newFloor = (parseInt(treeData[lastIndex].key) + 1).toString();
  const newTitle = `Kat ${newFloor}`;
  const newNode = { title: newTitle, key: newFloor, children: [] };

  treeData.push(newNode);
  dispatch({ type: UPDATE_TREE, payload: treeData });
};

export const addPlan =
  ({ layerGroup, extent, name, floor }) =>
  (dispatch, getState) => {
    try {
      const { map, treeData } = getState();

      treeData.forEach((data) => {
        if (data.key === floor) {
          let newKey;
          if (data.children.length > 0) {
            const lastIndex = data.children.length - 1;
            newKey =
              floor +
              "." +
              (parseInt(data.children[lastIndex].key.slice(2)) + 1).toString();
          } else {
            data.children = [];
            newKey = floor + ".1";
          }
          const newTitle = `Ofis ${newKey}`;
          const newNode = {
            title: newTitle,
            key: newKey,
            name,
            extent,
            layerGroup,
            children: [],
          };
          data.children.push(newNode);
          dispatch({ type: UPDATE_TREE, payload: treeData });
          dispatch({ type: SET_NAME, payload: name });

          map.getLayers().forEach((layer) => {
            layer.setVisible(false);
          });
          map.addLayer(layerGroup);
          map.setView(createView(extent));
          return;
        }
      });
    } catch (error) {
      return error;
    }
  };
