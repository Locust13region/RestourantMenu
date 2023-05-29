//import { ServiceContext } from "../../services/resto-service"; // for get context function
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuListItem from "../menu-list-item";
import { getMenu } from "../../store/menuSlice";
import Spinner from "../spinner";
import "./menu-list.scss";

const MenuList = () => {
	const dispatch = useDispatch();
	// const getMenu = useContext(ServiceContext); //get context function

	useEffect(() => {
		dispatch(getMenu());
	}, [dispatch]);

	const { menuItems, loading } = useSelector((state) => state.menuStore);

	if (loading) {
		return <Spinner />;
	}
	return (
		<ul className="menu__list">
			{menuItems.map((menuItem) => {
				return (
					<MenuListItem
						key={menuItem.id}
						menuItem={menuItem}
					/>
				);
			})}
		</ul>
	);
};

export default MenuList;
