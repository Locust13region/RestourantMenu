import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMenu = createAsyncThunk(
	"menu/getMenu",
	async (_, { rejectWithValue }) => {
		try {
			const promise = await fetch("http://localhost:3001/menu/");
			if (!promise.ok) {
				throw new Error("Can't fetch menu from server");
			}
			const data = await promise.json();
			return data;
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);

const initialState = {
	menuItems: [],
	loading: true,
	error: null,
};

const menuSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {
		// menuLoaded(state, action) {
		// 	state.menuItems = action.payload.arr;
		// 	state.loading = false;
		// },
		// menuRequested(state, action) {
		// 	state.loading = true;
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(getMenu.pending, (state, action) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getMenu.fulfilled, (state, action) => {
				state.menuItems = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(getMenu.rejected, (state, action) => {
				console.log(action.payload);
				state.error = action.payload;
			});
	},
});

export const { menuLoaded, menuRequested } = menuSlice.actions;
export default menuSlice.reducer;
