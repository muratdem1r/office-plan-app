import { useEffect } from "react";
import { useSelector } from "react-redux";

import styles from "./Popup.module.css";

function Popup({ popup, popupRef }) {
  const map = useSelector((state) => state.map);

  useEffect(() => {
    if (map) {
      map.addOverlay(popup);
    }
  }, [map, popup]);

  return (
    <div ref={popupRef} className={styles.ol_popup}>
      <span className={styles.overlay_text} id="popup-name"></span>
      <span className={styles.overlay_text} id="popup-title"></span>
    </div>
  );
}

export default Popup;
