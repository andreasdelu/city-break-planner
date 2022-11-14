import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Loading() {
	return (
		<>
			<div className='loadingContainer'>
				<div className='spinnerContainer'>
					<FontAwesomeIcon className='loadingSpinner' icon={faSpinner} />
					<p>Loading</p>
				</div>
			</div>
		</>
	);
}
