import { ServiceContext } from "../../services/resto-service";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuListItem from "../menu-list-item";
import { menuLoaded, menuRequested } from "../../store/menuSlice";
import { getMenu } from "../../store/menuSlice";
import Spinner from "../spinner";
import "./menu-list.scss";

const MenuList = () => {
	const dispatch = useDispatch();
	// const getMenu = useContext(ServiceContext);

	// useEffect(() => {
	// 	dispatch(menuRequested());

	// 	getMenu().then((arr) => {
	// 		dispatch(menuLoaded({ arr }));
	// 	});
	// }, [getMenu, dispatch]);
	useEffect(() => {
		dispatch(getMenu());
	}, [dispatch]);

	const { menuItems, loading } = useSelector((state) => state.menuStore);

	if (loading) {
		return <Spinner />;
	}
	return (
		<ul className="menu__list">
			{menuItems.map(({ id, title, category, url, price }) => {
				return (
					<MenuListItem
						key={id}
						title={title}
						category={category}
						price={price}
						url={url}
					/>
				);
			})}
		</ul>
	);
};

export default MenuList;
