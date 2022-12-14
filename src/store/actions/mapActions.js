// Types
import {
  SET_MAP,
  UPDATE_TREE,
  SET_KEY,
  SET_NOTIFICATION,
} from "store/types/mapTypes";

// Helpers
import { createView } from "map/helpers/createView";
import { findObj, findObjAndRemove } from "map/helpers/findObj";

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
  let newFloor, newTitle;

  if (lastIndex < 0) {
    newFloor = "0";
    newTitle = "Zemin";
  } else {
    newFloor = (parseInt(treeData[lastIndex].key) + 1).toString();
    newTitle = `Kat ${newFloor}`;
  }

  const newNode = { title: newTitle, key: newFloor, children: [] };

  treeData.push(newNode);
  dispatch({ type: UPDATE_TREE, payload: treeData });
};

/**
 *
 * PLAN
 *
 */

// CREATE Plan
export const addPlan =
  ({ layerGroup, extent, name, floor, isChangePlan = true }) =>
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
  if (!key) {
    dispatch(setSelectedOfficeKey(null));
    return;
  }

  const { map, treeData, selectedOfficeKey } = getState();
  const { layerGroup, extent } = findObj(treeData, key);

  try {
    // Make old layer unvisible
    if (selectedOfficeKey) {
      const result = findObj(treeData, selectedOfficeKey);
      result?.layerGroup.setVisible(false);
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
export const removePlan = (key) => (dispatch, getState) => {
  const { treeData, map } = getState();

  const { updatedTreeData, plan } = findObjAndRemove(treeData, key);

  // UPDATE treeData
  dispatch({ type: UPDATE_TREE, payload: updatedTreeData });
  map.removeLayer(plan.layerGroup);

  return plan;
};

export const movePlan = (key, destinationKey) => (dispatch, getState) => {
  const plan = dispatch(removePlan(key));
  const { layerGroup, extent, name } = plan;

  dispatch(
    addPlan({
      layerGroup,
      extent,
      name,
      floor: destinationKey,
    })
  );

  plan.children.forEach((child) => {
    const feature = child.feature;
    dispatch(addRoom(feature));
  });
};

/**
 *
 * ROOM
 *
 */
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

export const removeRoom = (key) => (dispatch, getState) => {
  const { treeData } = getState();

  const parentKey = key.slice(0, 3);
  const { layerGroup } = findObj(treeData, parentKey);
  const vectorSource = layerGroup.getLayers().item(1).getSource();

  const { updatedTreeData, plan } = findObjAndRemove(treeData, key);

  // UPDATE treeData
  dispatch({ type: UPDATE_TREE, payload: updatedTreeData });
  vectorSource.removeFeature(plan.feature);
};

// SET Notification for antd notification
export const setNotification = (info) => (dispatch) => {
  dispatch({ type: SET_NOTIFICATION, payload: info });
};
