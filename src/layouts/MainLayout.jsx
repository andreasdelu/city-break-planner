import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Nav from "../components/Nav";

export default function MainLayout() {
	const [showHeader, setShowHeader] = useState(true);

	const mainRef = useRef(null);

	useEffect(() => {
		const main = mainRef.current;
		main.addEventListener("scroll", hideHeader, false);

		return () => {
			main.removeEventListener("scroll", hideHeader, false);
		};
	}, [mainRef]);

	let lastScrollPos;

	function hideHeader(e) {
		let scroll = e.target.scrollTop;
		if (scroll < lastScrollPos) {
			setShowHeader(true);
		}
		if (scroll > lastScrollPos) {
			setShowHeader(false);
		}
		lastScrollPos = scroll;
	}

	return (
		<>
			<Header show={showHeader} />
			<Nav />
			<div ref={mainRef} id='mainContent'>
				<Outlet />
			</div>
		</>
	);
}
