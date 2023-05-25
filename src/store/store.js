import { configureStore } from "@reduxjs/toolkit";
import restoReducer from "./menuSlice";

export default configureStore({
	reducer: {
		menuStore: restoReducer,
	},
});
