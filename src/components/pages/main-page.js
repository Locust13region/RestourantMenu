import { ErrorBoundary } from "react-error-boundary";
import Error from "../error";
import MenuList from "../menu-list";

const MainPage = () => {
	return (
		<ErrorBoundary FallbackComponent={<Error />}>
			<MenuList />
		</ErrorBoundary>
	);
};

export default MainPage;
