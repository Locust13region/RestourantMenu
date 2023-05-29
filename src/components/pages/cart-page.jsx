import { ErrorBoundary } from "react-error-boundary";
import { useDispatch } from "react-redux";
import Error from "../error";
import CartTable from "../cart-table";
import { deleteOrder, sendOrder } from "../../store/menuSlice";
import { useEffect } from "react";

const CartPage = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(deleteOrder());
	}, [dispatch]);
	return (
		<div className="cart">
			<ErrorBoundary FallbackComponent={<Error />}>
				<CartTable />
				<div className="cart__title">
					<button
						className="menu__btn"
						onClick={() => {
							dispatch(sendOrder());
						}}
					>
						Send an order
					</button>
				</div>
			</ErrorBoundary>
		</div>
	);
};

export default CartPage;
