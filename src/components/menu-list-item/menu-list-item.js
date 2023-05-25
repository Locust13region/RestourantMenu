import "./menu-list-item.scss";

const MenuListItem = ({ d, title, category, url, price }) => {
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
			<button className="menu__btn">Add to cart</button>
		</li>
	);
};

export default MenuListItem;
