import "ol/ol.css";
import "assets/styles/App.css";
import MapWrapper from "map/components/MapWrapper";

import store from "store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MapWrapper />
      </div>
    </Provider>
  );
}

export default App;
