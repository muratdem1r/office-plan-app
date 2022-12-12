const clearInteractions = (map, array) => {
  array.forEach((interaction) => {
    map.removeInteraction(interaction);
  });
};

export default clearInteractions;
