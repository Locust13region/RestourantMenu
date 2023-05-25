import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { ServiceContext } from "./services/resto-service";
import { restoService } from "./services/resto-service";
import { BrowserRouter as Router } from "react-router-dom";
import Error from "./components/error";
import store from "./store/store";
import App from "./components/app";

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<ErrorBoundary FallbackComponent={<Error />}>
			<ServiceContext.Provider value={restoService}>
				<Router>
					<App />
				</Router>
			</ServiceContext.Provider>
		</ErrorBoundary>
	</Provider>
	// </React.StrictMode>
);
