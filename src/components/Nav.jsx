import {
	faBars,
	faLocationDot,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
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
					<div className='navItemContainer'>
						<FontAwesomeIcon className='navItem' icon={faLocationDot} />
						<p>Test</p>
					</div>
					<div className='navItemContainer'>
						<FontAwesomeIcon className='navItem' icon={faLocationDot} />
						<p>Test</p>
					</div>
					<div className='navItemContainer'>
						<FontAwesomeIcon className='navItem' icon={faLocationDot} />
						<p>Test</p>
					</div>
					<div className='navItemContainer'>
						<FontAwesomeIcon className='navItem' icon={faLocationDot} />
						<p>Test</p>
					</div>
				</div>
			</div>
		</>
	);
}
