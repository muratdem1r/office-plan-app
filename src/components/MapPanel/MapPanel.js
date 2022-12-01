import React from "react";
import { Button, Space, Tooltip } from "antd";
import NewOfficeForm from "./NewOfficeForm";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "antd";
import { addFloor, changeFloor, selectPlan } from "store/actions/mapActions";
const { Panel } = Collapse;

function MapPanel() {
  const dispatch = useDispatch();
  const selectedFloor = useSelector((state) => state.selectedFloor);
  const floors = useSelector((state) => state.floors);
  const offices = useSelector((state) => state.offices);

  const changeOfficeHandler = (officeName) => {
    dispatch(selectPlan(officeName));
  };

  const addFloorHandler = () => {
    dispatch(addFloor());
  };

  return (
    <Space direction="vertical" className="map-panel" style={{ width: "100%" }}>
      <Collapse defaultActiveKey={["1"]}>
        {floors.map((floor) => {
          return (
            <Panel key={floor} header={`Kat ${floor}`}>
              <Space direction="vertical">
                {offices.map((office) => {
                  if (office.floor === floor) {
                    return (
                      <Button
                        className="office-name"
                        type="text"
                        key={office.name}
                        value={office.name}
                        onClick={() => changeOfficeHandler(office.name)}
                      >
                        {office.name}
                      </Button>
                    );
                  }
                })}
                <NewOfficeForm defaultFloor={floor} />
              </Space>
            </Panel>
          );
        })}
      </Collapse>
      <Button onClick={addFloorHandler} type="dashed">
        Yeni Kat
      </Button>
    </Space>
  );
}

export default MapPanel;
