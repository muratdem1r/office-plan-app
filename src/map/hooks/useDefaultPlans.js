import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Constants
import plans from "constants/plans";
import members from "constants/members";

// Actions
import { addPlan } from "store/actions/mapActions";

// Helpers
import { createFeature } from "map/helpers/createFeature";
import yemeksepetiMembers from "constants/yemeksepetiMembers";

function useDefaultPlans() {
  const dispatch = useDispatch();

  useEffect(() => {
    plans.forEach((plan) => {
      dispatch(addPlan(plan));

      // Add features to mahrek
      if (plan.name === "mahrek") {
        members.forEach((member) => {
          const { coords, image, name, title } = member;
          const newFeature = createFeature({
            coords,
            image,
            name,
            title,
          });

          plan.layerGroup
            .getLayers()
            .item(1)
            .getSource()
            .addFeature(newFeature);
        });
      }
      // Add features to yemeksepeti
      else if (plan.name === "yemeksepeti") {
        yemeksepetiMembers.forEach((member) => {
          const { coords, color, name, title } = member;
          const newFeature = createFeature({
            coords,
            color,
            name,
            title,
          });

          plan.layerGroup
            .getLayers()
            .item(1)
            .getSource()
            .addFeature(newFeature);
        });
      }
    });
    // eslint-disable-next-line
  }, []);
  return;
}

export default useDefaultPlans;
