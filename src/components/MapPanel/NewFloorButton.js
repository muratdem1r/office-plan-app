import { Button } from "antd";
import { useDispatch } from "react-redux";

// Actions
import { addFloor } from "store/actions/mapActions";

function NewFloorButton() {
  const dispatch = useDispatch();

  return (
    <Button
      type="dashed"
      onClick={() => {
        dispatch(addFloor());
      }}
    >
      Yeni Kat
    </Button>
  );
}

export default NewFloorButton;
