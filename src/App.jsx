import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import IntroPage from "./pages/IntroPage";
import HelperPage from "./pages/HelperPage";
import MainLayout from "./layouts/MainLayout";

function App() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((pos) =>
			console.log("Location enabled")
		);
	} else {
		console.log("Location not supported or denied by user");
	}
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/helper' element={<HelperPage />} />
				<Route path='/' element={<IntroPage />} />
				<Route path='/' element={<MainLayout />}>
					<Route path='home' element={<HomePage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
