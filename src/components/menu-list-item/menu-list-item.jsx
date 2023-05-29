import { useDispatch } from "react-redux";
import { addToCart } from "../../store/menuSlice";
import "./menu-list-item.scss";

const MenuListItem = ({ menuItem }) => {
	const dispatch = useDispatch();
	const { title, category, url, price } = menuItem;
	return (
		<li className="menu__item">
			<div className="menu__title">{title}</div>
			<img
				className="menu__img"
				src={url}
				alt={title}
			></img>
			<div className="menu__category">
				Category: <span>{category}</span>
			</div>
			<div className="menu__price">
				Price: <span>{price}$</span>
			</div>
			<button
				className="menu__btn"
				onClick={() => {
					dispatch(addToCart(menuItem));
				}}
			>
				Add to cart
			</button>
		</li>
	);
};

export default MenuListItem;
