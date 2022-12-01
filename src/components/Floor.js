import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Space } from "antd";
import { addFloor, changeFloor } from "store/actions/mapActions";

import NewOfficeForm from "./MapPanel/NewOfficeForm";

function Floor() {
  const dispatch = useDispatch();
  const selectedFloor = useSelector((state) => state.selectedFloor);
  const floors = useSelector((state) => state.floors);
  const notification = useSelector((state) => state.notification);

  const changeFloorHandler = (e) => {
    const floor = parseInt(e.target.value);

    const empty = dispatch(changeFloor(floor));

    if (empty) {
      notification.info({
        message: `Empty Floor`,
        description: (
          <>
            <p>The floor you selected is empty</p>
            <NewOfficeForm defaultFloor={floor} />
          </>
        ),
      });
    }
  };

  const addFloorHandler = () => {
    dispatch(addFloor());
  };

  return (
    <Space wrap>
      {floors.map((floor) => {
        if (selectedFloor === floor) {
          return (
            <div key={floor} className="floor">
              Floor {floor}
            </div>
          );
        }
        return (
          <Button
            key={floor}
            type="dashed"
            value={floor}
            onClick={changeFloorHandler}
          >
            {floor}
          </Button>
        );
      })}
      <Button type="dashed" onClick={addFloorHandler}>
        +
      </Button>
    </Space>
  );
}

export default Floor;
