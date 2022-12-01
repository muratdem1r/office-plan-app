import "ol/ol.css";
import "assets/styles/App.css";
import MapWrapper from "components/MapWrapper";
import MapPanel from "components/MapPanel/MapPanel";
import { Col, Row, Space } from "antd";
import Floor from "components/Floor";
import OfficeName from "components/OfficeName";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { setNotification } from "store/actions/mapActions";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const [info, infoHolder] = notification.useNotification();

  useEffect(() => {
    // save antd notification to redux
    dispatch(setNotification(info));
  }, []);

  return (
    <div className="App">
      {infoHolder}
      <Row>
        <Col span={24} md={16}>
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
          >
            <OfficeName />
            <MapWrapper />
            <Floor />
          </Space>
        </Col>
        <Col
          span={24}
          md={8}
          style={{ paddingLeft: "3rem", marginTop: "3rem" }}
        >
          <MapPanel />
        </Col>
      </Row>
    </div>
  );
}

export default App;
