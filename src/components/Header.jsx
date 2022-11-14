import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Header({ show = true }) {
	const headerRef = useRef(null);
	useEffect(() => {
		if (!show) {
			headerRef.current.style.transform = "translateY(-100%)";
		} else {
			headerRef.current.style.transform = "translateY(0%)";
		}
	}, [show]);
	return (
		<header ref={headerRef} className='header'>
			<Link to={"/home"}>
				<img className='logo' src={logo} alt='logo' />
			</Link>
		</header>
	);
}
