import DeleteConfirm from "components/Popup/DeleteConfirm";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function Popup({ popup, popupRef, featureNameRef, featureTitleRef }) {
  const map = useSelector((state) => state.map);

  useEffect(() => {
    if (map) {
      map.addOverlay(popup);
    }
  }, [map, popup]);

  return (
    <div ref={popupRef} className="ol-popup">
      <button
        onClick={() => {
          popup.setPosition(undefined);
        }}
        className="ol-popup-closer"
      ></button>
      <div className="popup-content">
        <span
          className="overlay-text"
          id="feature-name"
          ref={featureNameRef}
        ></span>
        <span
          className="overlay-text"
          id="feature-title"
          ref={featureTitleRef}
        ></span>
      </div>
      <DeleteConfirm popup={popup} />
    </div>
  );
}

export default Popup;
