import "ol/ol.css";
import "assets/styles/App.css";
import MapWrapper from "map/components/MapWrapper";
import MapPanel from "map/components/MapPanel";
import { Col, Row } from "antd";

function App() {
  return (
    <div className="App">
      <Row>
        <Col span={16}>
          <MapWrapper />
        </Col>
        <Col span={8}>
          <MapPanel />
        </Col>
      </Row>
    </div>
  );
}

export default App;
