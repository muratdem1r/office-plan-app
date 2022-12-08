import { findObj } from "map/helpers/findObj";
import { useSelector } from "react-redux";

function useFindBySelectedKey() {
  const { treeData, selectedOfficeKey } = useSelector((state) => state);
  const result = findObj(treeData, selectedOfficeKey);

  return result;
}

export default useFindBySelectedKey;
