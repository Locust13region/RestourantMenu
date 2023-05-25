import { MainPage, CartPage } from "../pages";
import AppHeader from "../app-header";
import Background from "./food-bg.jpg";
import { Route, Routes } from "react-router-dom";

const App = () => {
	return (
		<div
			style={{ background: `url(${Background}) center center/cover no-repeat` }}
			className="app"
		>
			<AppHeader total={50} />
			<Routes>
				<Route
					path="/"
					element={<MainPage />}
				/>
				<Route
					path="cart"
					element={<CartPage />}
				/>
			</Routes>
		</div>
	);
};

export default App;
