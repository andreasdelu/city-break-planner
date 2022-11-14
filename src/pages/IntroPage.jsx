import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import introVid from "../assets/intro.mp4";
import logo from "../assets/VDHvid.png";
import planmate from "../assets/logo.svg";
import Button from "../components/Button";
import "./styles/IntroPage.css";

export default function IntroPage() {
	const navigate = useNavigate();

	return (
		<>
			<div className='videoContainer'>
				<video src={introVid} id='introVid' autoPlay={true} loop muted></video>
				<div className='videoOverlay'></div>
			</div>
			<div id='introContent'>
				<div className='introHeader'>
					<h1 className='introTitle'>
						Welcome to <br />
					</h1>
					<img className='introLogo' src={planmate} alt='logo' />
					<p>by</p>
					<img src={logo} alt='logo' />
				</div>
				<div className='introButtonContainer'>
					<Button
						onClick={() => {
							navigate("/helper");
						}}
						cta={true}
						text='Help me find stuff to do'
						icon={<FontAwesomeIcon icon={faChevronRight} />}
					/>
					<Button
						onClick={function () {
							navigate("/home");
						}}
						text="I'll explore on my own"
						icon={<FontAwesomeIcon icon={faChevronRight} />}
					/>
				</div>
			</div>
		</>
	);
}
