import { notification } from "antd";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

// Styles
import "ol/ol.css";
import "assets/styles/App.css";

// Actions
import { setNotification } from "store/actions/mapActions";

// Openlayers
import Overlay from "ol/Overlay";
import Popup from "components/Popup/Popup";

// Components
import MapWrapper from "components/MapWrapper/MapWrapper";
import MapPanel from "components/MapPanel/MapPanel";
import OfficeName from "components/OfficeName/OfficeName";
import Controllers from "components/Controllers/Controllers";

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
      <MapWrapper
        popup={popup}
        featureNameRef={featureNameRef}
        featureTitleRef={featureTitleRef}
      />
      <MapPanel />
    </div>
  );
}

export default App;
