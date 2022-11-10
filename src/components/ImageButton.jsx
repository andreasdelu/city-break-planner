import React from "react";
import "./styles/ImageButton.css";

export default function ImageButton({
	height = "100px",
	image = "",
	text = "",
	subText = "",
	onClick = () => {},
}) {
	return (
		<>
			<div
				onClick={onClick}
				style={{ height: `${height}` }}
				className='imageButtonContainer'>
				<img className='imageButtonImage' src={image} alt='button' />
				<div className='imageButtonOverlay'></div>
				<p className='imageButtonText'>{text}</p>
				<small className='imageButtonSubText'>{subText}</small>
			</div>
		</>
	);
}
