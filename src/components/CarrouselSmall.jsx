import React, { useEffect, useRef, useState } from "react";
import "./styles/Carrousel.css";

import { getDistance } from "../services/geolocation";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function CarrouselSmall({ userCoords = "", placesArray = [] }) {
	const placesRef = useRef(null);
	const [places, setplaces] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		setplaces(placesArray);
	}, [placesArray]);

	return (
		<div className='carrouselSmall'>
			<div ref={placesRef} className='placesCarrouselSmall'>
				{places.length === 0 && (
					<>
						<div className='carrouselItemSmall carrouselLoading'></div>
						<div className='carrouselItemSmall carrouselLoading'></div>
						<div className='carrouselItemSmall carrouselLoading'></div>
						<div className='carrouselItemSmall carrouselLoading'></div>
					</>
				)}
				{places.map((place) => (
					<div
						onClick={() => navigate("/" + place.id)}
						key={place.id}
						className='carrouselItemSmall'>
						<img
							className='placeImageSmall'
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
							{place.distance && (
								<p className='placeDistance'>{place.distance} Kilometers</p>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
