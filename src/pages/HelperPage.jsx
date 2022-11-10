import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import "./styles/HelperPage.css";
import beach from "../assets/beach.jpeg";
import cph from "../assets/cph1.jpeg";
import aarhus from "../assets/aarhus2.jpeg";
import aalborg from "../assets/aalborg1.jpeg";
import odense from "../assets/odense1.jpeg";
import ImageButton from "../components/ImageButton";

export default function HelperPage() {
	const [pageIndex, setpageIndex] = useState(0);
	const [circleIndex, setcircleIndex] = useState(0);
	const indicatorRef = useRef(null);
	const [city, setCity] = useState("");
	const [activity, setActivity] = useState("");
	const [people, setPeople] = useState("");

	const MAX_STEPS = 3;

	const BUTTON_HEIGHT = "100px";

	useEffect(() => {
		console.log(city);
	}, [city]);

	function nextPage(pageNum) {
		const page = document.querySelector(".pageHelper");
		page.classList.add("nextPage");
		page.ontransitionend = () => {
			setpageIndex(pageNum);
		};
		indicatorRef.current.ontransitionend = () => {
			setcircleIndex(pageNum);
		};
	}

	return (
		<>
			<div className='stepIndicator'>
				<div className='indicatorBG'>
					<div
						ref={indicatorRef}
						style={{ width: `${(pageIndex / MAX_STEPS) * 100}%` }}
						className='indicatorLine'></div>
				</div>

				<div
					onClick={() => {
						if (pageIndex > 0) {
							nextPage(0);
						}
					}}
					className={
						circleIndex >= 0 ? "indicatorCircle circleRed" : "indicatorCircle"
					}>
					<div className='circleText'>{city ? city : "City"}</div>
				</div>
				<div
					onClick={() => {
						if (pageIndex > 1) {
							nextPage(1);
						}
					}}
					className={
						circleIndex >= 1 ? "indicatorCircle circleRed" : "indicatorCircle"
					}>
					<div className='circleText'>{activity ? activity : "Activity"}</div>
				</div>
				<div
					onClick={() => {
						if (pageIndex > 2) {
							nextPage(2);
						}
					}}
					className={
						circleIndex >= 2 ? "indicatorCircle circleRed" : "indicatorCircle"
					}>
					<div className='circleText'>{people ? people : "People"}</div>
				</div>
				<div
					onClick={() => {
						if (pageIndex > 3) {
							nextPage(3);
						}
					}}
					className={
						circleIndex >= 3 ? "indicatorCircle circleRed" : "indicatorCircle"
					}></div>
			</div>
			{pageIndex === 0 && (
				<div
					style={{ backgroundImage: `url()` }}
					className='pageHelper'
					id='page0'>
					{/* <div className='backgroundOverlay'></div> */}
					<h1 className='siteTitle helperTitle'>
						What <span className='highlight'>city</span> are <br /> you
						visiting?
					</h1>
					<div className='helperButtons'>
						<ImageButton
							subText='Big city, big adventures'
							text='Copenhagen'
							height={BUTTON_HEIGHT}
							image={cph}
							onClick={() => {
								setCity("Copenhagen");
								nextPage(1);
							}}
						/>
						<ImageButton
							subText='City of smiles'
							text='Aarhus'
							height={BUTTON_HEIGHT}
							image={aarhus}
							onClick={() => {
								setCity("Aarhus");
								nextPage(1);
							}}
						/>
						<ImageButton
							subText='Hometown of H.C. Andersen'
							text='Odense'
							height={BUTTON_HEIGHT}
							image={odense}
							onClick={() => {
								setCity("Odense");
								nextPage(1);
							}}
						/>
						<ImageButton
							subText='Capital of North Jutland'
							text='Aalborg'
							height={BUTTON_HEIGHT}
							image={aalborg}
							onClick={() => {
								setCity("Aalborg");
								nextPage(1);
							}}
						/>
					</div>
				</div>
			)}
			{pageIndex === 1 && (
				<div
					style={{ backgroundImage: `url()` }}
					className='pageHelper'
					id='page1'>
					{/* <div className='backgroundOverlay'></div> */}
					<h1 className='siteTitle helperTitle'>
						What <span className='highlight'>activity</span> are <br /> you
						looking for?
					</h1>
					<div className='helperButtons'>
						<ImageButton
							subText='Big city, big adventures'
							text='Eating'
							height={BUTTON_HEIGHT}
							image={cph}
							onClick={() => {
								setActivity("Eating");
								nextPage(2);
							}}
						/>
						<ImageButton
							subText='City of smiles'
							text='Nightlife'
							height={BUTTON_HEIGHT}
							image={aarhus}
							onClick={() => {
								setActivity("Nightlife");
								nextPage(2);
							}}
						/>
						<ImageButton
							subText='Hometown of H.C. Andersen'
							text='Events'
							height={BUTTON_HEIGHT}
							image={odense}
							onClick={() => {
								setActivity("Events");
								nextPage(2);
							}}
						/>
						<ImageButton
							subText='Capital of North Jutland'
							text='Art'
							height={BUTTON_HEIGHT}
							image={aalborg}
							onClick={() => {
								setActivity("Art");
								nextPage(2);
							}}
						/>
					</div>
				</div>
			)}
			{pageIndex === 2 && (
				<div
					style={{ backgroundImage: `url()` }}
					className='pageHelper'
					id='page2'>
					{/* <div className='backgroundOverlay'></div> */}
					<h1 className='siteTitle helperTitle'>
						How many <span className='highlight'>people</span> are going?
					</h1>
					<div className='helperButtons'>
						<ImageButton
							subText='Big city, big adventures'
							text='Copenhagen'
							height={BUTTON_HEIGHT}
							image={cph}
						/>
						<ImageButton
							subText='City of smiles'
							text='Aarhus'
							height={BUTTON_HEIGHT}
							image={aarhus}
						/>
						<ImageButton
							subText='Hometown of H.C. Andersen'
							text='Odense'
							height={BUTTON_HEIGHT}
							image={odense}
						/>
						<ImageButton
							subText='Capital of North Jutland'
							text='Aalborg'
							height={BUTTON_HEIGHT}
							image={aalborg}
						/>
					</div>
				</div>
			)}
		</>
	);
}
