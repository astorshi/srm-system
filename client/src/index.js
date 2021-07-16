import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
// import UserProvider from "./contexts/UserProvider";

ReactDOM.render(
  <React.StrictMode>
    {/* <UserProvider> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </UserProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
