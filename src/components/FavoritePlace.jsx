import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDistance } from "../services/geolocation";
import "./styles/FavoritePlace.css";

export default function FavoritePlace({ userCoords = "", placeData = "" }) {
	const [place, setPlace] = useState(placeData);
	const [dist, setDist] = useState();

	const navigate = useNavigate();

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
		if (userCoords) {
			setDist(
				getPlaceDistance(place?.coords?.Latitude, place?.coords?.Longitude)
			);
		}
	}, [userCoords]);

	function dislike() {
		let likes = JSON.parse(localStorage.getItem("liked"));
		likes = likes.filter((like) => like !== place.id.toString());
		localStorage.setItem("liked", JSON.stringify(likes));
		document.getElementById(place.id).style.display = "none";
	}

	return (
		<>
			{place && (
				<div id={place.id} className='favoritePlaceContainer'>
					<img
						onClick={() => navigate(`/${place.id}`)}
						className='favoriteImage'
						src={
							place?.images[0]
								? place?.images[0]?.Uri
								: `https://maps.googleapis.com/maps/api/staticmap?center=${place?.coords?.Latitude},${place?.coords?.Longitude}&zoom=14&size=400x400&maptype=roadmap&markers=color:red%7C${place?.coords?.Latitude},${place?.coords?.Longitude}&key=AIzaSyBhtwhKCdAePb3PK4OMvFMQYLTnKclq1MA`
						}
						alt={place.name}
					/>
					<div
						onClick={() => navigate(`/${place.id}`)}
						className='favoriteInfo'>
						<p className='favoriteName'>{place.name}</p>
						<p className='favoriteStreet'>{place.address.addressLine}</p>
						<p className='favoriteCity'>{place.address.city}</p>
						{dist ? (
							<p className='favoriteDistance'>{dist} Kilometers</p>
						) : (
							<p style={{ opacity: 0.3 }} className='favoriteDistance'>
								Loading distance...
							</p>
						)}
					</div>
					<div className='likeFavorite'>
						<FontAwesomeIcon onClick={dislike} icon={faHeart} />
					</div>
				</div>
			)}
		</>
	);
}
