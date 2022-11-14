import {
	faChevronLeft,
	faHeart,
	faShare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { getPlaceFromId } from "../services/datafetcher";

import "./styles/PlacePage.css";

export default function PlacePage() {
	const { placeId } = useParams();
	const [placeData, setPlaceData] = useState(null);
	const [isLiked, setIsLiked] = useState(checkLiked);

	function checkLiked() {
		if (localStorage.getItem("liked")) {
			const likes = localStorage.getItem("liked");
			if (likes.includes(placeId)) {
				return true;
			} else return false;
		} else return false;
	}

	useEffect(() => {
		async function getPlace() {
			const place = await getPlaceFromId(placeId);
			setPlaceData(place);
		}
		getPlace();
	}, [placeId]);

	function likePlace() {
		if (localStorage.getItem("liked")) {
			let likes = JSON.parse(localStorage.getItem("liked"));
			if (likes.includes(placeId)) {
				likes = likes.filter((like) => like !== placeId);
				localStorage.setItem("liked", JSON.stringify(likes));
				setIsLiked(false);
			} else {
				likes.push(placeId);
				localStorage.setItem("liked", JSON.stringify(likes));
				setIsLiked(true);
			}
		} else {
			let likes = [];
			likes.push(placeId);
			localStorage.setItem("liked", JSON.stringify(likes));
			setIsLiked(true);
		}
	}

	return (
		<>
			{!placeData && <Loading />}
			{placeData && (
				<>
					<div className='placePageContainer'>
						<FontAwesomeIcon
							onClick={() => window.history.back()}
							className='backIcon'
							icon={faChevronLeft}
						/>
						<div className='placePageImages'>
							{placeData?.images.length > 0 ? (
								placeData.images.map((image, i) => (
									<img
										key={i}
										className='placePageImg'
										src={image.Uri}
										alt={image.AltText}
									/>
								))
							) : (
								<img
									className='placePageMapImg'
									src={`https://maps.googleapis.com/maps/api/staticmap?center=${placeData?.coords?.Latitude},${placeData?.coords?.Longitude}&zoom=14&size=512x512&maptype=roadmap&markers=color:red%7C${placeData?.coords?.Latitude},${placeData?.coords?.Longitude}&key=AIzaSyBhtwhKCdAePb3PK4OMvFMQYLTnKclq1MA`}
									alt={placeData.name}
								/>
							)}
						</div>
						<div className='placePageContent'>
							<div className='interactions'>
								<FontAwesomeIcon
									onClick={likePlace}
									className={isLiked ? "likePlace liked" : "likePlace"}
									icon={faHeart}
								/>
							</div>
							<h2 className='placePageName'>{placeData.name}</h2>
							<div className='openingsContainer'>
								{placeData.openings ? (
									<>
										<div className='openingHours'>
											<p style={{ fontWeight: "400" }}>Openings:</p>
											<p>
												{placeData.openings.StartTime.slice(0, 5)} -{" "}
												{placeData.openings.EndTime.slice(0, 5)}
											</p>
										</div>
										<div className='openingDays'>
											{placeData.openings.Monday ? (
												<p>Mon</p>
											) : (
												<p style={{ opacity: 0.2 }}>Mon</p>
											)}
											{placeData.openings.Tuesday ? (
												<p>Tue</p>
											) : (
												<p style={{ opacity: 0.2 }}>Tue</p>
											)}
											{placeData.openings.Wednesday ? (
												<p>Wed</p>
											) : (
												<p style={{ opacity: 0.2 }}>Wed</p>
											)}
											{placeData.openings.Thursday ? (
												<p>Thu</p>
											) : (
												<p style={{ opacity: 0.2 }}>Thu</p>
											)}
											{placeData.openings.Friday ? (
												<p>Fri</p>
											) : (
												<p style={{ opacity: 0.2 }}>Fri</p>
											)}
											{placeData.openings.Saturday ? (
												<p>Sat</p>
											) : (
												<p style={{ opacity: 0.2 }}>Sat</p>
											)}
											{placeData.openings.Sunday ? (
												<p>Sun</p>
											) : (
												<p style={{ opacity: 0.2 }}>Sun</p>
											)}
										</div>
									</>
								) : (
									<div className='openingHours'>
										<p style={{ fontWeight: "400" }}>Openings:</p>
										<p>No data</p>
									</div>
								)}
							</div>
							<div className='placePageContact'>
								<p style={{ fontWeight: "400" }}>Contact:</p>
								<div className='p-container'>
									Phone:{" "}
									{placeData.contact.phone ? (
										<a href={`tel:${placeData.contact.phone}`}>
											{placeData.contact.phone}
										</a>
									) : (
										"None"
									)}
								</div>
								<div className='p-container'>
									Email:{" "}
									{placeData.contact.email ? (
										<a href={`mailto:${placeData.contact.email}`}>
											{placeData.contact.email}
										</a>
									) : (
										<p style={{ opacity: 0.3 }}>None</p>
									)}
								</div>
								<div className='p-container'>
									Website:{" "}
									{placeData.contact.url ? (
										<a
											href={placeData.contact.url}
											target='_blank'
											rel='noreferrer'>
											{placeData.contact.url}
										</a>
									) : (
										<p style={{ opacity: 0.3 }}>None</p>
									)}
								</div>
							</div>
							<div className='placePageLocation'>
								<p style={{ fontWeight: "400" }}>Address:</p>
								<p className='placePageAddress'>
									{placeData.address.addressLine}, {placeData.address.city}
								</p>
								<a
									className='placeMap'
									href={`https://www.google.com/maps/search/?api=1&query=${placeData?.coords?.Latitude},${placeData?.coords?.Longitude}`}
									target='_blank'
									rel='noreferrer'>
									<iframe
										title='Map'
										style={{
											border: 0,
										}}
										referrerPolicy='no-referrer-when-downgrade'
										src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA-KPiBtFvCp9U0O_HLYXrr0kQ2hnXMAAE&q=${placeData?.coords?.Latitude},${placeData?.coords?.Longitude}`}></iframe>
								</a>
							</div>

							<div className='placePageDescription'>
								<p style={{ fontWeight: "400" }}>Description:</p>
								<p>{placeData.description.replace(/ /g, " ")}</p>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
