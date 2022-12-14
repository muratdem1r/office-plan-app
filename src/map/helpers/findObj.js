export const findObj = (array, key) => {
  let result;

  const findObjRecursive = (array, key) => {
    array.forEach((child) => {
      if (child.key === key) {
        // found it!!
        result = child;
        return;
      }

      // search for children
      if (child.children) {
        findObjRecursive(child.children, key);
      }
    });
  };

  findObjRecursive(array, key);

  return result;
};

export const findObjAndRemove = (array, key) => {
  let plan;

  const findObjAndRemoveRecursive = (array, key) => {
    return array.filter((child) => {
      const keep = child.key !== key;

      if (keep && child.children) {
        child.children = findObjAndRemoveRecursive(child.children, key);
      } else if (!keep) {
        plan = child;
      }

      return keep;
    });
  };

  const updatedTreeData = findObjAndRemoveRecursive(array, key);

  return { updatedTreeData, plan };
};
