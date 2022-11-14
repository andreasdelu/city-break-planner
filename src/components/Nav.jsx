import {
	faBars,
	faCog,
	faHeart,
	faHome,
	faHouse,
	faLocationDot,
	faRoute,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Nav.css";

export default function Nav() {
	const [showNav, setShowNav] = useState(false);

	return (
		<>
			<div onClick={() => setShowNav(!showNav)} id='burgerMenu'>
				{showNav ? (
					<FontAwesomeIcon className='burger' icon={faXmark} />
				) : (
					<FontAwesomeIcon className='burger' icon={faBars} />
				)}
			</div>
			<div className={showNav ? "" : "hideNavBar"} id='navBar'>
				<div className={showNav ? "navBG showNavBG" : "navBG"}></div>

				<div
					className={showNav ? "navBarContainer showNav" : "navBarContainer"}>
					<Link to={"/home"} className='navItemContainer'>
						<FontAwesomeIcon className='navItem' icon={faHouse} />
						<p>Home</p>
					</Link>
					<Link className='navItemContainer'>
						<FontAwesomeIcon className='navItem' icon={faHeart} />
						<p>Favorites</p>
					</Link>
					<Link className='navItemContainer'>
						<FontAwesomeIcon className='navItem' icon={faRoute} />
						<p>Planner</p>
					</Link>
					<Link className='navItemContainer'>
						<FontAwesomeIcon className='navItem' icon={faCog} />
						<p>Settings</p>
					</Link>
				</div>
			</div>
		</>
	);
}
