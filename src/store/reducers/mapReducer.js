const initialState = {
  notification: null,
  map: null,
  selectedOfficeKey: null,
  treeData: [
    {
      title: "Kat 1",
      key: "1",
      children: [],
    },
    {
      title: "Kat 2",
      key: "2",
      children: [],
    },
  ],
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_TREE":
      return { ...state, treeData: [...action.payload] };
    case "SET_MAP":
      return { ...state, map: action.payload };
    case "SET_KEY":
      return { ...state, selectedOfficeKey: action.payload };
    case "SET_NOTIFICATION":
      return { ...state, notification: action.payload };

    default:
      return state;
  }
};

export default mapReducer;

// EXAMPLE MODEL
//
// treeData: [
//   {
//     title: "Kat 1",
//     key: "1",
//     children: [
//       {
//         key: "1.1",
//         title: "Ofis 1.1",
//         name: "mahrek",
//         layerGroup: null,
//         extent: [0, 0, 0, 0],
//         interaction: null,
//         children: [
//           {
//             key: "1.1.1",
//             title: "Oda 1.1.1",
//             feature: null,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: "Kat 2",
//     key: "2",
//     children: [],
//   },
// ],
