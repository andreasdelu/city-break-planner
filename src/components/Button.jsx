import React from "react";
import "./styles/Button.css";

export default function Button({
	onClick = () => {},
	cta = false,
	text = "",
	icon = "",
}) {
	return (
		<div
			onClick={onClick}
			className={cta ? "buttonContainer buttonCTA" : "buttonContainer"}>
			<div className='buttonText'>
				{text} {icon}
			</div>
		</div>
	);
}
