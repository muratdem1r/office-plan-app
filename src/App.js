import { notification } from "antd";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "store/actions/mapActions";

// Styles
import "ol/ol.css";
import "assets/styles/App.css";

// Components
import MapWrapper from "components/MapWrapper/MapWrapper";
import MapPanel from "components/MapPanel/MapPanel";
import OfficeName from "components/OfficeName/OfficeName";
import Controllers from "components/Controllers/Controllers";
import { useRef } from "react";
import Overlay from "ol/Overlay";
import Popup from "components/Popup/Popup";

const popup = new Overlay({});

function App() {
  const dispatch = useDispatch();
  const [info, infoHolder] = notification.useNotification();

  const popupRef = useRef();
  const featureNameRef = useRef();
  const featureTitleRef = useRef();

  useEffect(() => {
    // save antd notification to redux
    dispatch(setNotification(info));
    popup.setElement(popupRef.current);
  }, []);

  return (
    <div className="App">
      {infoHolder}
      <Popup
        popup={popup}
        popupRef={popupRef}
        featureNameRef={featureNameRef}
        featureTitleRef={featureTitleRef}
      />

      <OfficeName />
      <Controllers
        popup={popup}
        featureNameRef={featureNameRef}
        featureTitleRef={featureTitleRef}
      />
      <MapWrapper />
      <MapPanel />
    </div>
  );
}

export default App;
