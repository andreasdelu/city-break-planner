import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import "./styles/HelperPage.css";
import beach from "../assets/beach.jpeg";
import cph from "../assets/cph1.jpeg";
import aarhus from "../assets/aarhus2.jpeg";
import aalborg from "../assets/aalborg1.jpeg";
import odense from "../assets/odense1.jpeg";
import art from "../assets/art.jpg";
import eating from "../assets/eating.jpg";
import events from "../assets/events.jpg";
import nightlife from "../assets/nightlife.jpg";
import people1 from "../assets/1-2/1-2.jpg";
import people2 from "../assets/3-5/3-5.jpg";
import people3 from "../assets/6-8/6-8.jpg";
import people4 from "../assets/9+/9+.jpg";
import ImageButton from "../components/ImageButton";
import { Link, useNavigate } from "react-router-dom";
import Carrousel from "../components/Carrousel";

import { getPlacesFromCategory, getAllPlaces } from "../services/datafetcher";
import { getCoords } from "../services/geolocation";

export default function HelperPage() {
	const [pageIndex, setpageIndex] = useState(0);
	const [circleIndex, setcircleIndex] = useState(0);
	const indicatorRef = useRef(null);
	const [city, setCity] = useState("");
	const [activity, setActivity] = useState("");
	const [people, setPeople] = useState("");
	const [userCoords, setUserCoords] = useState({});

	const [loading, setLoading] = useState(false);

	const [places, setPlaces] = useState([]);

	const MAX_STEPS = 3;

	const BUTTON_HEIGHT = "100px";

	const navigate = useNavigate();

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((pos) => {
				setUserCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
			});
		} else {
			console.log("Location not supported or denied by user");
		}
	}, []);

	useEffect(() => {
		if (loading) {
			getPlaces();
		}
	}, [loading]);

	async function getPlaces() {
		let id;
		switch (activity) {
			case "Food & Drinks":
				id = 62;
				break;
			case "Events":
				id = 58;
				break;
			case "Activities":
				id = 36;
				break;
			case "Art":
				id = 3;
				break;

			default:
				break;
		}
		setTimeout(() => {
			setLoading(false);
			navigate(`/${id}/${city}/${activity}/${people}`);
		}, 800);
	}

	function nextPage(pageNum) {
		const page = document.querySelector(".pageHelper");
		page.classList.add("nextPage");
		page.ontransitionend = () => {
			setpageIndex(pageNum);
		};
		indicatorRef.current.ontransitionend = () => {
			setcircleIndex(pageNum);
			if (pageNum === 3) {
				setLoading(true);
				const indi = document.querySelector(".stepIndicator");
				indi.ontransitionend = () => {
					setTimeout(() => {
						indi.style.display = "none";
					}, 500);
				};
				setTimeout(() => {
					indi.classList.add("hideIndicator");
				}, 300);
			}
		};
	}

	return (
		<div id='mainContent'>
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
					<div className='circleText'>
						{people ? people + " People" : "People"}
					</div>
				</div>
				<div
					onClick={() => {
						if (pageIndex > 3) {
							nextPage(3);
						}
					}}
					className={
						circleIndex >= 3 ? "indicatorCircle circleRed" : "indicatorCircle"
					}>
					<div className='circleText'>{"Done"}</div>
				</div>
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
							subText='Denmarks northern capital'
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
						What <span className='highlight'>activity</span> are you looking
						for?
					</h1>
					<div className='helperButtons'>
						<ImageButton
							subText='Danish couisine when it´s best'
							text='Food & Drinks'
							height={BUTTON_HEIGHT}
							image={eating}
							onClick={() => {
								setActivity("Food & Drinks");
								nextPage(2);
							}}
						/>
						<ImageButton
							subText='Exciting things to do in Denmark'
							text='Activities'
							height={BUTTON_HEIGHT}
							image={nightlife}
							onClick={() => {
								setActivity("Activities");
								nextPage(2);
							}}
						/>
						<ImageButton
							subText='Experience exciting events'
							text='Events'
							height={BUTTON_HEIGHT}
							image={events}
							onClick={() => {
								setActivity("Events");
								nextPage(2);
							}}
						/>
						<ImageButton
							subText='Take in danish and international culture'
							text='Attractions'
							height={BUTTON_HEIGHT}
							image={art}
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
							subText='Activities for you and a friend'
							text='1-2 People'
							height={BUTTON_HEIGHT}
							image={people1}
							onClick={() => {
								setPeople("1-2");
								nextPage(3);
							}}
						/>
						<ImageButton
							subText='Activities for your friendgroup'
							text='3-5 People'
							height={BUTTON_HEIGHT}
							image={people2}
							onClick={() => {
								setPeople("3-5");
								nextPage(3);
							}}
						/>
						<ImageButton
							subText='Activities to entertain a small crowd'
							text='6-8 People'
							height={BUTTON_HEIGHT}
							image={people3}
							onClick={() => {
								setPeople("6-8");
								nextPage(3);
							}}
						/>
						<ImageButton
							subText='Activities for a pack of people'
							text='9+ People'
							height={BUTTON_HEIGHT}
							image={people4}
							onClick={() => {
								setPeople("9+");
								nextPage(3);
							}}
						/>
					</div>
				</div>
			)}
			{pageIndex <= 2 && <Link to={"/"}>Cancel</Link>}
			{pageIndex === 3 && (
				<div className='pageHelper' id='page3'>
					<h1 className='siteTitle helperTitle'>
						We are looking for <span className='highlight'>{activity}</span>{" "}
						activities for{" "}
						<span style={{ whiteSpace: "nowrap" }} className='highlight'>
							{people + " People"}
						</span>{" "}
						in <span className='highlight'>{city}</span>...
					</h1>
				</div>
			)}
			{pageIndex === 4 && (
				<div className='pageHelper' id='donePage'>
					<h1 className='siteTitle helperTitle'>
						Results for <span className='highlight'>{activity}</span> activities
						for{" "}
						<span style={{ whiteSpace: "nowrap" }} className='highlight'>
							{people + " People"}
						</span>{" "}
						in <span className='highlight'>{city}</span>!
					</h1>
					<Carrousel userCoords={userCoords} places={places} />
				</div>
			)}
		</div>
	);
}
