import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Carrousel from "../components/Carrousel";
import Loading from "../components/Loading";
import { getPlacesFromCategory } from "../services/datafetcher";
import "./styles/HelperPage.css";

export default function HelperFilteredPage({ userCoords = "" }) {
	const { categoryId, city, activity, people } = useParams();
	const [places, setPlaces] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	async function getPlaces() {
		const places = await getPlacesFromCategory(parseInt(categoryId));
		setPlaces(places);
		setLoading(false);
	}

	useEffect(() => {
		getPlaces();
	}, []);
	return (
		<div id='mainContent'>
			{loading && <Loading />}
			{places.length && (
				<div className='pageHelper' id='donePage'>
					<h1 className='siteTitle helperTitle'>
						Results for <span className='highlight'>{activity}</span> activities
						for{" "}
						<span style={{ whiteSpace: "nowrap" }} className='highlight'>
							{people + " People"}
						</span>{" "}
						in <span className='highlight'>{city}</span>
					</h1>
					<Carrousel userCoords={userCoords} places={places} />
					<div className='helperButton'>
						<Button
							cta={false}
							onClick={function () {
								navigate("/home");
							}}
							text='Explore activities'
							icon={<FontAwesomeIcon icon={faChevronRight} />}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
