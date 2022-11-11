import React, { useEffect, useRef, useState } from "react";
import "./styles/Carrousel.css";

import { getDistance } from "../services/geolocation";
import { useNavigate } from "react-router-dom";

export default function Carrousel({ userCoords = "", places = [] }) {
	const [categories, setCategories] = useState([]);
	const [chosenCategory, setChosenCategory] = useState(0);
	const [filteredPlaces, setFilteredPlaces] = useState([]);
	const catRef = useRef(null);
	const placesRef = useRef(null);

	const navigate = useNavigate();

	function getPlaceDistance(lat, lon) {
		const distance = getDistance(lat, lon, userCoords.lat, userCoords.lon, "K");

		if (isNaN(distance) || !userCoords) {
			return "";
		} else {
			return distance + " Kilometers";
		}
	}

	useEffect(() => {
		let allIds = [];
		let allCategories = [];
		places.forEach((place) => {
			if (!allIds.includes(place.category.Id)) {
				allIds.push(place.category.Id);
				allCategories.push({
					id: place.category.Id,
					name: place.category.Name,
				});
			}
		});
		setCategories(allCategories);
		setChosenCategory(0);
		loadPlacesWithCategory(allCategories[0].id);
	}, []);

	useEffect(() => {}, [categories]);

	function chooseCategory(elem, index, id) {
		setChosenCategory(index);
		loadPlacesWithCategory(id);
	}

	function loadPlacesWithCategory(id) {
		let filter = [];
		places.forEach((place) => {
			if (place.category.Id === id) {
				filter.push(place);
			}
		});
		setFilteredPlaces(filter);
	}

	return (
		<div className='carrousel'>
			<div ref={catRef} className='categoryCarrousel'>
				{categories.map((category, i) => (
					<p
						onClick={(e) => {
							placesRef.current.scrollLeft = 0;
							chooseCategory(e, i, category.id);
							setTimeout(() => {
								e.target.scrollIntoView({
									behavior: "smooth",
									block: "nearest",
									inline: "center",
								});
							}, 200);
						}}
						key={category.id}
						className={
							chosenCategory === i ? "category categoryPicked" : "category"
						}>
						{category.name}
					</p>
				))}
			</div>
			<div ref={placesRef} className='placesCarrousel'>
				{filteredPlaces.map((place) => (
					<div
						onClick={() => navigate("/" + place.id)}
						key={place.id}
						className='carrouselItem'>
						<img
							className='placeImage'
							src={
								place?.images[0]
									? place?.images[0]?.Uri
									: `https://maps.googleapis.com/maps/api/staticmap?center=${place?.coords?.Latitude},${place?.coords?.Longitude}&zoom=14&size=400x400&maptype=roadmap&markers=color:red%7C${place?.coords?.Latitude},${place?.coords?.Longitude}&key=AIzaSyBhtwhKCdAePb3PK4OMvFMQYLTnKclq1MA`
							}
							alt={place.name}
						/>
						<div className='placeImageOverlay'></div>
						<div className='placeContent'>
							<p className='placeName'>{place.name}</p>
							<p className='placeAddress'>
								{place.address.addressLine}, {place.address.city}
							</p>
							{userCoords && (
								<p className='placeDistance'>
									{getPlaceDistance(
										place?.coords?.Latitude,
										place?.coords?.Longitude
									)}
								</p>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
