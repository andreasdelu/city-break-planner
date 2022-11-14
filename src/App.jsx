import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import IntroPage from "./pages/IntroPage";
import HelperPage from "./pages/HelperPage";
import MainLayout from "./layouts/MainLayout";
import PlacePage from "./pages/PlacePage";
import HelperFilteredPage from "./pages/HelperFilteredPage";
import Favorites from "./pages/Favorites";

function App() {
	const [userCoords, setUserCoords] = useState("");

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((pos) => {
				console.log("Location enabled");
				setUserCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
			});
		} else {
			console.log("Location not supported or denied by user");
		}
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/helper' element={<HelperPage />} />
				<Route path='/' element={<IntroPage />} />
				<Route
					path='/:categoryId/:city/:activity/:people'
					element={<HelperFilteredPage userCoords={userCoords} />}
				/>
				<Route path='/' element={<MainLayout />}>
					<Route path='home' element={<HomePage userCoords={userCoords} />} />
					<Route path=':placeId' element={<PlacePage />} />
					<Route
						path='favorites'
						element={<Favorites userCoords={userCoords} />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
