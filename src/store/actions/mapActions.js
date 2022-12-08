import { createView } from "map/helpers/createView";
import { findObj } from "map/helpers/findObj";
import {
  SET_MAP,
  UPDATE_TREE,
  SET_KEY,
  SET_NOTIFICATION,
} from "store/types/mapTypes";

export const newMap = (map) => (dispatch) => {
  dispatch({ type: SET_MAP, payload: map });
};

const setSelectedOfficeKey = (key) => (dispatch) => {
  dispatch({ type: SET_KEY, payload: key });
};

// CREATE Floor
export const addFloor = () => (dispatch, getState) => {
  const { treeData } = getState();
  const lastIndex = treeData.length - 1;
  const newFloor = (parseInt(treeData[lastIndex].key) + 1).toString();
  const newTitle = `Kat ${newFloor}`;
  const newNode = { title: newTitle, key: newFloor, children: [] };

  treeData.push(newNode);
  dispatch({ type: UPDATE_TREE, payload: treeData });
};

// CREATE Plan
export const addPlan =
  ({ layerGroup, extent, name, floor }) =>
  (dispatch, getState) => {
    try {
      const { map, treeData } = getState();

      treeData.forEach((data) => {
        if (data.key === floor) {
          let newKey;

          // Create key
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

          // New Office Plan
          const newTitle = `${name} ${newKey}`;
          const newNode = {
            title: newTitle,
            key: newKey,
            name,
            extent,
            layerGroup,
            children: [],
          };

          // Push new node to treeData
          data.children.push(newNode);

          // UPDATE treeData
          dispatch({ type: UPDATE_TREE, payload: treeData });

          // Add Layer to Map
          map.addLayer(layerGroup);

          // Change Visible Plan
          dispatch(changePlan(newKey));
        }
      });
    } catch (error) {
      return error;
    }
  };

// CHANGE Plan
export const changePlan = (key) => (dispatch, getState) => {
  const { map, treeData, selectedOfficeKey } = getState();
  const { layerGroup, extent } = findObj(treeData, key);

  try {
    // Make old layer unvisible
    if (selectedOfficeKey) {
      const { layerGroup } = findObj(treeData, selectedOfficeKey);
      layerGroup.setVisible(false);
    }
    // Make new layer visible
    layerGroup.setVisible(true);

    // Extent map to new view
    map.setView(createView(extent));

    // Save selected plan's key
    dispatch(setSelectedOfficeKey(key));
  } catch (error) {
    console.log(error);
  }
};

export const addRoom = (feature) => (dispatch, getState) => {
  const { treeData, selectedOfficeKey } = getState();

  treeData.forEach((data) => {
    data.children.forEach((office) => {
      if (office.key === selectedOfficeKey) {
        let newKey;

        // Create key
        if (office.children.length > 0) {
          const lastIndex = office.children.length - 1;
          newKey =
            office.key +
            "." +
            (parseInt(office.children[lastIndex].key.slice(4)) + 1).toString();
        } else {
          office.children = [];
          newKey = office.key + ".1";
        }

        // New Room
        const newTitle = `Oda ${newKey}`;
        const newNode = {
          title: newTitle,
          key: newKey,
          feature,
        };

        // Push new node to treeData
        office.children.push(newNode);

        // UPDATE treeData
        dispatch({ type: UPDATE_TREE, payload: treeData });
      }
    });
  });
};
export const addEmployee = (room, feature) => (dispatch, getState) => {
  const { treeData, selectedOfficeKey } = getState();

  treeData.forEach((data) => {
    data.children.forEach((office) => {
      if (office.key === selectedOfficeKey) {
        console.log(office);
      }
    });
  });
};

// SET Notification for antd notification
export const setNotification = (info) => (dispatch) => {
  dispatch({ type: SET_NOTIFICATION, payload: info });
};
