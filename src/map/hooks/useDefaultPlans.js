import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Constants
import plans from "constants/plans";
import members from "constants/members";

// Actions
import { addPlan } from "store/actions/mapActions";

// Helpers
import { createAvatarFeature } from "map/helpers/createFeature";

function useDefaultPlans() {
  const dispatch = useDispatch();

  useEffect(() => {
    plans.forEach((plan) => {
      dispatch(addPlan(plan));

      // Add features to mahrek
      if (plan.name === "mahrek") {
        members.forEach((member) => {
          const { coords, image, name, title } = member;
          const newFeature = createAvatarFeature(coords, image, name, title);

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
