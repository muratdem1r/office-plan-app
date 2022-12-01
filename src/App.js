import { Col, Row, Space, notification } from "antd";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "store/actions/mapActions";

// Styles
import "ol/ol.css";
import "assets/styles/App.css";

// Components
import MapWrapper from "components/MapWrapper";
import MapPanel from "components/MapPanel/MapPanel";
import OfficeName from "components/OfficeName";

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
      <Row justify="center">
        <Col span={24} xl={12}>
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
          >
            <OfficeName />
            <MapWrapper />
          </Space>
        </Col>
        <Col
          span={24}
          xl={{ span: 8, offset: 1 }}
          style={{
            marginTop: "3rem",
          }}
        >
          <MapPanel />
        </Col>
      </Row>
    </div>
  );
}

export default App;
