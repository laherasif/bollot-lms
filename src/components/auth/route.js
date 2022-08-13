import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

export function withPublic(Component) {
	return function WithPublic(props) {

        const {token , User} = useSelector((state) => state.userReducer)

		const router = useRouter();

		if (!User && !token) {
			router.replace("/");
			return <h1>Loading...</h1>;
		}
		return <Component auth={token} {...props} />;
	};
}

export function withProtected(Component) {
	return function WithProtected(props) {
		const router = useRouter();
        const {token , User} = useSelector((state) => state.userReducer)

		if (!token) {
			router.push("/en/login");
			// return <h1>Loading...</h1>;
		}
        // else{
		// 	router.push("/en/login");
        // }

		return <Component auth={token} {...props} />;
	};
}