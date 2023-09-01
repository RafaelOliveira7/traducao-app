import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import React from 'react';
import ImageTranslate from './pages/ImageTraslate/ImageTranslate';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/image-translate" element={<ImageTranslate />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
