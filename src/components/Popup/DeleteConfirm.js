import { Button, Popconfirm } from "antd";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Select } from "ol/interaction";

function DeleteConfirm({ popup }) {
  const map = useSelector((state) => state.map);
  const selectedVectorLayer = useSelector((state) => state.selectedVectorLayer);
  const selectedLayerGroup = useSelector((state) => state.selectedLayerGroup);

  const select = new Select({
    style: null,
  });

  useEffect(() => {
    if (map) {
      map.addInteraction(select);
    }
  }, [map, selectedLayerGroup]);

  return (
    <Popconfirm
      title="Emin misiniz?"
      onConfirm={() => {
        select.getFeatures().forEach((feature) => {
          if (feature.get("title") === "Director Of Research Development") {
            alert("Buna yetkin yok!");
          } else {
            selectedVectorLayer.getSource().removeFeature(feature);
          }
          popup.setPosition(undefined);
        });
      }}
      onCancel={() => {}}
      okText="Evet"
      cancelText="Hayır"
    >
      <Button className="fireButton" type="primary" danger>
        KOV
      </Button>
    </Popconfirm>
  );
}

export default DeleteConfirm;
