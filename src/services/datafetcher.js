const url =
	"https://raw.githubusercontent.com/manypossibles/designops/master/assets/data/en/data.json";
async function getAllPlaces() {
	const response = await fetch(url);
	const data = await response.json();
	const filteredrest = [];

	const categoryArray = [];

	try {
		for (var i = 0; i < data.length; i++) {
			var place = data[i];
			const placeObject = {
				id: place.Id,
				name: place.Name,
				mainCategory: place.MainCategory.Id,
				category: place.Category,
				address: {
					addressLine: place.Address.AddressLine1,
					city: place.Address.City,
				},
				coords: place.Address.GeoCoordinate,
				contact: {
					phone: place.ContactInformation?.Phone,
					email: place.ContactInformation?.Email,
					url: place.ContactInformation?.Link?.Url,
				},
				description: place.Descriptions[0]?.Text,
				images: place.Files,
				socials: place.SocialMediaLinks,
				openings: place.Periods[0],
			};
			filteredrest.push(placeObject);
		}
		return filteredrest;
	} catch (error) {
		console.error(error);
		return [];
	}
}
async function getPlacesFromCategory(id) {
	const response = await fetch(url);
	const data = await response.json();
	const filteredrest = [];

	try {
		for (var i = 0; i < data.length; i++) {
			var place = data[i];
			if (place.MainCategory.Id === id) {
				const placeObject = {
					id: place.Id,
					name: place.Name,
					category: place.Category,
					address: {
						addressLine: place.Address.AddressLine1,
						city: place.Address.City,
					},
					coords: place.Address.GeoCoordinate,
					contact: {
						phone: place.ContactInformation?.Phone,
						email: place.ContactInformation?.Email,
						url: place.ContactInformation?.Link?.Url,
					},
					description: place.Descriptions[0]?.Text,
					images: place.Files,
					socials: place.SocialMediaLinks,
					openings: place.Periods[0],
				};
				filteredrest.push(placeObject);
			}
		}
		return filteredrest;
	} catch (error) {
		console.error(error);
		return [];
	}
}

async function getPlaceFromId(id) {
	const response = await fetch(url);
	const data = await response.json();

	try {
		for (var i = 0; i < data.length; i++) {
			var place = data[i];
			if (place.Id == id) {
				const placeObject = {
					id: place.Id,
					name: place.Name,
					category: place.Category,
					address: {
						addressLine: place.Address.AddressLine1,
						city: place.Address.City,
					},
					coords: place.Address.GeoCoordinate,
					contact: {
						phone: place.ContactInformation?.Phone,
						email: place.ContactInformation?.Email,
						url: place.ContactInformation?.Link?.Url,
					},
					description: place.Descriptions[0]?.Text,
					images: place.Files,
					socials: place.SocialMediaLinks,
					openings: place.Periods[0],
				};
				return placeObject;
			}
		}
	} catch (error) {
		console.error(error);
		return [];
	}
}

async function getPlacesFromIdArray(idArray) {
	const response = await fetch(url);
	const data = await response.json();
	const filteredrest = [];
	try {
		for (var i = 0; i < data.length; i++) {
			var place = data[i];
			if (idArray.includes(place.Id.toString())) {
				const placeObject = {
					id: place.Id,
					name: place.Name,
					mainCategory: place.MainCategory.Id,
					category: place.Category,
					address: {
						addressLine: place.Address.AddressLine1,
						city: place.Address.City,
					},
					coords: place.Address.GeoCoordinate,
					images: place.Files,
				};
				filteredrest.push(placeObject);
			}
		}
		return filteredrest;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export {
	getAllPlaces,
	getPlacesFromCategory,
	getPlaceFromId,
	getPlacesFromIdArray,
};
