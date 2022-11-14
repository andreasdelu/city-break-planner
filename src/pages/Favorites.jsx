import React, { useEffect, useState } from "react";
import FavoritePlace from "../components/FavoritePlace";
import { getPlacesFromIdArray } from "../services/datafetcher";
import { getDistance } from "../services/geolocation";

export default function Favorites({ userCoords = "" }) {
	const [noneLoaded, setNoneLoaded] = useState(false);
	const [likedPlaces] = useState(getLiked);
	const [places, setPlaces] = useState([]);
	const [filteredPlaces, setFilteredPlaces] = useState([]);

	function getLiked() {
		if (localStorage.getItem("liked")) {
			if (JSON.parse(localStorage.getItem("liked") === "[]")) {
				setNoneLoaded(true);
				return false;
			}
			return JSON.parse(localStorage.getItem("liked"));
		} else {
			setNoneLoaded(true);
			return [];
		}
	}

	useEffect(() => {
		async function getPlaces() {
			let data = await getPlacesFromIdArray(likedPlaces);
			data.sort((a, b) => a.name.localeCompare(b.name));
			setPlaces(data);
		}
		if (likedPlaces.length > 0) {
			getPlaces();
		}
	}, [likedPlaces]);

	return (
		<>
			<h2 style={{ marginTop: "5rem", color: "white", textAlign: "center" }}>
				Favorites
			</h2>
			{!noneLoaded && (
				<>
					{places.length > 0 &&
						places.map((place, i) => (
							<FavoritePlace
								key={i}
								userCoords={userCoords}
								placeData={place}
							/>
						))}

					{!places.length && (
						<div className='favoritePlaceContainer favoriteLoading'></div>
					)}
				</>
			)}
			{noneLoaded && (
				<h3 style={{ marginTop: "5rem", color: "white", textAlign: "center" }}>
					No favorites found
				</h3>
			)}
		</>
	);
}
