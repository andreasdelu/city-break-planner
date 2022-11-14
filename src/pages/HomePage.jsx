import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Carrousel from "../components/Carrousel";
import CarrouselSmall from "../components/CarrouselSmall";
import Loading from "../components/Loading";
import { getAllPlaces } from "../services/datafetcher";
import { getDistance } from "../services/geolocation";
import "./styles/HomePage.css";

export default function HomePage({ userCoords = "" }) {
	const [places, setPlaces] = useState([]);
	const [closestPlaces, setClosestPlaces] = useState([]);
	const [filteredPlaces, setFilteredPlaces] = useState([]);
	const [pickedCategory, setPickedCategory] = useState(0);

	useEffect(() => {
		async function getPlaces() {
			const allplaces = await getAllPlaces();
			setPlaces(allplaces);
		}
		getPlaces();
	}, []);

	function getPlaceDistance(lat, lon) {
		if (!userCoords) return;
		const distance = getDistance(lat, lon, userCoords.lat, userCoords.lon, "K");

		if (isNaN(distance) || !userCoords) {
			return "";
		} else {
			return parseFloat(distance);
		}
	}

	useEffect(() => {
		let filtered = [];
		places.forEach((place) => {
			place.distance = getPlaceDistance(
				place?.coords?.Latitude,
				place?.coords?.Longitude
			);
			filtered.push(place);
		});
		filtered.sort((a, b) => a.distance - b.distance);
		filtered = filtered.filter((e) => e.distance !== "");
		setClosestPlaces(filtered.slice(0, 6));
		filterPlaces(62);
	}, [places, userCoords]);

	async function filterPlaces(categoryId) {
		let filtered = [];
		places.forEach((place) => {
			if (place.mainCategory === parseInt(categoryId)) {
				filtered.push(place);
			}
		});
		setFilteredPlaces(filtered);
	}

	return (
		<>
			{!places.length && <Loading />}
			<div id='homePageWrap'>
				{places.length && (
					<>
						<div className='closestWrap'>
							<h2
								style={{
									color: "white",
									textAlign: "center",
									marginBottom: "1rem",
									marginTop: 0,
								}}>
								Closest to you
							</h2>
							{closestPlaces.length && (
								<CarrouselSmall
									userCoords={userCoords}
									placesArray={closestPlaces}
								/>
							)}
						</div>
						<h2
							style={{
								color: "white",
								textAlign: "center",
								marginBottom: "1rem",
								marginTop: "3rem",
								width: "100%",
							}}>
							Filter places
						</h2>
						<div className='citySelectWrap'>
							<p>City</p>
							<div className='selectCity'>
								<FontAwesomeIcon className='selectArrow' icon={faChevronDown} />
								<select name='citySelect' id='citySelect'>
									<option value='Aarhus'>Aarhus</option>
									<option value='Copenhagen'>Copenhagen</option>
									<option value='Odense'>Odense</option>
									<option value='Aalborg'>Aalborg</option>
								</select>
							</div>
						</div>
						<div className='categorySelectWrap'>
							<p
								onClick={(e) => {
									filterPlaces(e.target.dataset.category);
									setPickedCategory(0);
								}}
								data-category='62'
								className={
									pickedCategory === 0
										? "homeCategory homeCategoryPicked"
										: "homeCategory"
								}>
								Food & Drinks
							</p>
							<p
								onClick={(e) => {
									filterPlaces(e.target.dataset.category);
									setPickedCategory(1);
								}}
								data-category='36'
								className={
									pickedCategory === 1
										? "homeCategory homeCategoryPicked"
										: "homeCategory"
								}>
								Activities
							</p>
							<p
								onClick={(e) => {
									filterPlaces(e.target.dataset.category);
									setPickedCategory(2);
								}}
								data-category='58'
								className={
									pickedCategory === 2
										? "homeCategory homeCategoryPicked"
										: "homeCategory"
								}>
								Events
							</p>
							<p
								onClick={(e) => {
									filterPlaces(e.target.dataset.category);
									setPickedCategory(3);
								}}
								data-category='3'
								className={
									pickedCategory === 3
										? "homeCategory homeCategoryPicked"
										: "homeCategory"
								}>
								Attractions
							</p>
						</div>
						{filteredPlaces.length && (
							<div className='allPlacesWrap'>
								<Carrousel userCoords={userCoords} places={filteredPlaces} />
							</div>
						)}
					</>
				)}
			</div>
		</>
	);
}
