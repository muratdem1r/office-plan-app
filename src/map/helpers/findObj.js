let result;
export const findObj = (array, key) => {
  array.forEach((child) => {
    if (child.key === key) {
      // found it!!
      result = child;
      return;
    }

    // search for children
    if (child.children) {
      findObj(child.children, key);
    }
  });
  return result;
};
