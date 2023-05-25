import { createContext } from "react";

export const restoService = async () => {
	const url = "http://localhost:3001/menu/";
	try {
		const promise = await fetch(url);

		if (!promise.ok) {
			throw new Error(`Can't fetch from ${url}`);
		}
		const data = await promise.json();
		return data;
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const ServiceContext = createContext(restoService);
