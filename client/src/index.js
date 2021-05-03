import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import userStore from "./redux/userStore";
import { Provider } from "react-redux";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={userStore}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
