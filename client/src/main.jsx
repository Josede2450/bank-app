import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./redux/store.js"; // To work with global state (Redux)
import { Provider } from "react-redux"; // From Redux
import { PersistGate } from "redux-persist/integration/react"; // To save the data
import ThemeProvider from "./components/ThemeProvider.jsx"; // To handle Dark Mode

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </PersistGate>
);
