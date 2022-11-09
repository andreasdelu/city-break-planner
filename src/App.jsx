import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import IntroPage from "./pages/IntroPage";
import HelperPage from "./pages/HelperPage";

function App() {
	return (
		<div id='mainContent'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<IntroPage />} />
					<Route path='/home' element={<HomePage />} />
					<Route path='/helper' element={<HelperPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
