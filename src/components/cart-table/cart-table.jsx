import { useSelector } from "react-redux";
import CartTableItem from "../cart-table-item/cart-table-item";
import "./cart-table.scss";

const CartTable = () => {
	const { cart } = useSelector((state) => state.menuStore);
	return (
		<>
			<div className="cart__title">You order:</div>
			{cart.map((cartItem) => {
				return (
					<CartTableItem
						key={cartItem.id}
						cartItem={cartItem}
					/>
				);
			})}
		</>
	);
};

export default CartTable;
