import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./redux/store.js"; // To work with global state (Redux)
import { Provider } from "react-redux"; // From Redux
import { PersistGate } from "redux-persist/integration/react"; // To save the data

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
);
