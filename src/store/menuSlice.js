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
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const sendOrder = createAsyncThunk(
	"menu/sendOrder",
	async (_, { rejectWithValue, getState }) => {
		const order = getState().menuStore.cart;
		if (order.length === 0) {
			return;
		}
		const requests = order.map((element) => {
			const { title, price, url, category, mult } = element;
			return fetch(`http://localhost:3001/cart/`, {
				method: "POST",
				body: JSON.stringify({ title, price, url, category, mult }),
				headers: {
					"Content-type": "application/json",
				},
			});
		});
		await Promise.all(requests).catch((error) => {
			console.log("catch");
			console.log(error);
			return rejectWithValue(error.message);
		});
	}
);

export const deleteOrder = createAsyncThunk(
	"menu/deleteOrder",
	async (_, { rejectWithValue }) => {
		try {
			const promiseCart = await fetch("http://localhost:3001/cart/");
			if (!promiseCart.ok) {
				throw new Error("Can't delete cart from server");
			}
			const cartItems = await promiseCart.json();
			if (cartItems.length === 0) {
				return;
			}
			const requests = [];
			cartItems.forEach((element) => {
				requests.push(
					fetch(`http://localhost:3001/cart/${element.id}`, {
						method: "DELETE",
					})
				);
			});
			await Promise.all(requests);
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const initialState = {
	menuItems: [],
	cart: [],
	totalPrice: 0,
	loading: true,
	error: null,
};

const menuSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {
		addToCart(state, action) {
			const findTargetItem = state.cart.find(
				(cartItem) => cartItem.id === action.payload.id
			);
			state.totalPrice += action.payload.price;
			if (!state.cart.length || !findTargetItem) {
				state.cart.push({ ...action.payload, mult: 1 });
			} else {
				findTargetItem.mult++;
			}
		},
		deleteFromCart(state, action) {
			state.totalPrice -= action.payload.price;
			if (action.payload.mult > 1) {
				state.cart.find((cartItem) => cartItem.id === action.payload.id).mult--;
			} else {
				state.cart.splice(
					state.cart.findIndex((cartItem) => cartItem.id === action.payload.id),
					1
				);
			}
		},
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
			})
			.addCase(sendOrder.pending, (state, action) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(sendOrder.fulfilled, (state, action) => {
				state.cart = [];
				state.totalPrice = 0;
				state.loading = false;
				state.error = null;
			})
			.addCase(sendOrder.rejected, (state, action) => {
				console.log(action.payload);
				state.error = action.payload;
			})
			.addCase(deleteOrder.rejected, (state, action) => {
				console.log(action.payload);
				state.error = action.payload;
			});
	},
});

export const { addToCart, deleteFromCart } = menuSlice.actions;
export default menuSlice.reducer;
