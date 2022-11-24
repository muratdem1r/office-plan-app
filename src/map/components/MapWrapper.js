import { useEffect, useRef, useState } from "react";

import { Button, Popconfirm } from "antd";

// Openlayers
import Map from "ol/Map";
import View from "ol/View";
import Overlay from "ol/Overlay";
import { Select } from "ol/interaction";
import { getCenter } from "ol/extent";

import { imageLayer } from "map/layers/imageLayer";
import { vectorLayer, vectorSource } from "map/layers/vectorLayer";
import { createFeature } from "map/features/createFeature";

import members from "constants/members";

function MapWrapper() {
  const [officeMap, setOfficeMap] = useState(null);
  const mapRef = useRef();
  const popupRef = useRef();
  const featureNameRef = useRef();
  const featureTitleRef = useRef();

  const popup = new Overlay({
    element: popupRef.current,
  });

  const select = new Select({
    style: null,
  });

  // COMPONENT CONSTRUCTOR
  useEffect(() => {
    setOfficeMap(
      new Map({
        layers: [imageLayer, vectorLayer],
        target: mapRef.current,
        view: new View({
          // center by image sizes
          center: getCenter([0, 0, 825, 805]),
          resolution: 1,
          maxResolution: 1,
          extent: [0, 0, 825, 805],
        }),
      })
    );
  }, []);

  // MAP LISTENERS
  const listeners = () => {
    officeMap.on("singleclick", (e) => {
      popup.setPosition(undefined);
      officeMap.forEachFeatureAtPixel(e.pixel, (feature) => {
        featureNameRef.current.innerHTML = feature.get("name") + "<br>";
        featureTitleRef.current.innerHTML = feature.get("title");

        popup.setPosition(e.coordinate);
      });
    });

    officeMap.on("pointermove", (e) => {
      officeMap.getTargetElement().style.cursor = "";
      officeMap.forEachFeatureAtPixel(e.pixel, (feature) => {
        officeMap.getTargetElement().style.cursor = "pointer";
      });
    });
  };

  // MAP IS READY
  useEffect(() => {
    if (officeMap) {
      // ADD FEATURES TO MAP
      members.forEach((member) => {
        const { coords, image, name, title } = member;
        const newFeature = createFeature(coords, image, name, title);
        vectorSource.addFeature(newFeature);
      });

      officeMap.addOverlay(popup);
      officeMap.addInteraction(select);
      listeners();
    }
  }, [officeMap]);

  return (
    <>
      <div ref={mapRef} className="map"></div>
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
        <Popconfirm
          title="Emin misiniz?"
          onConfirm={() => {
            select.getFeatures().forEach((feature) => {
              if (feature.get("title") === "Director Of Research Development") {
                alert("Buna yetkin yok!");
              } else {
                vectorSource.removeFeature(feature);
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
      </div>
    </>
  );
}

export default MapWrapper;
