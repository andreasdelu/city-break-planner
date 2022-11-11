import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaceFromId } from "../services/datafetcher";

export default function PlacePage() {
	const { placeId } = useParams();
	const [placeData, setPlaceData] = useState({});

	useEffect(() => {
		async function getPlace() {
			const place = await getPlaceFromId(placeId);
			setPlaceData(place);
		}
		getPlace();
	}, [placeId]);
	return (
		<>
			<p>{JSON.stringify(placeData)}</p>
		</>
	);
}
