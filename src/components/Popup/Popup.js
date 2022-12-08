import { useEffect } from "react";
import { useSelector } from "react-redux";

import DeleteConfirm from "components/Popup/DeleteConfirm";

import styles from "./Popup.module.css";

function Popup({ popup, popupRef, featureNameRef, featureTitleRef }) {
  const map = useSelector((state) => state.map);

  useEffect(() => {
    if (map) {
      map.addOverlay(popup);
    }
  }, [map, popup]);

  return (
    <div ref={popupRef} className={styles.ol_popup}>
      <button
        onClick={() => {
          popup.setPosition(undefined);
        }}
        className={styles.ol_popup_closer}
      ></button>
      <div className={styles.popup_content}>
        <span
          className={styles.overlay_text}
          id={styles.feature_name}
          ref={featureNameRef}
        ></span>
        <span
          className={styles.overlay_text}
          id={styles.feature_title}
          ref={featureTitleRef}
        ></span>
      </div>
      <DeleteConfirm popup={popup} />
    </div>
  );
}

export default Popup;
