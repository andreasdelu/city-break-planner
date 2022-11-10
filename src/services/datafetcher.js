const url =
	"https://raw.githubusercontent.com/manypossibles/designops/master/assets/data/en/data.json";
async function getAllPlaces() {
	const response = await fetch(url);
	const data = await response.json();
	const filteredrest = [];

	try {
		for (var i = 0; i < data.length; i++) {
			var place = data[i];
			if (!filteredrest.includes(place.Category.Id)) {
				filteredrest.push(place.Category.Id);
				filteredrest.push("Category: " + place.Category.Name);
			}
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
				filteredrest.push(place);
			}
		}
		return filteredrest;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export { getAllPlaces, getPlacesFromCategory };
