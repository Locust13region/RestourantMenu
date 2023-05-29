import { useDispatch } from "react-redux";
import { deleteFromCart } from "../../store/menuSlice";
const CartTableItem = ({ cartItem }) => {
	const dispatch = useDispatch();
	const { title, url, price, mult } = cartItem;
	return (
		<div className="cart__list">
			<div className="cart__item">
				<img
					src={url}
					className="cart__item-img"
					alt={title}
				></img>
				<div className="cart__item-title">{title}</div>
				<div className="cart__item-price">
					{mult} x {price}$ = {mult * price}$
				</div>
				<div
					className="cart__close"
					onClick={() => {
						dispatch(deleteFromCart(cartItem));
					}}
				>
					&times;
				</div>
			</div>
		</div>
	);
};

export default CartTableItem;
