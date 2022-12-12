import styles from "./Popup.module.css";

function Popup({ popupRef }) {
  return (
    <div ref={popupRef} className={styles.ol_popup}>
      <span className={styles.overlay_text} id="popup-name"></span>
      <span className={styles.overlay_text} id="popup-title"></span>
    </div>
  );
}

export default Popup;
