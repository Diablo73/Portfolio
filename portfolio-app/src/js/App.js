import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import '../css/App.css';
import Home from '../pages/home/Home.js';
import Splash from '../pages/splash/Splash.js';
import CustomCursor from './CustomCursor.js';

console.log(`ENV variable : REACT_APP_RUN_SPLASH_SCREEN : ${process.env.REACT_APP_RUN_SPLASH_SCREEN}`);
const IS_RUN_SPLASH_SCREEN = process.env.REACT_APP_RUN_SPLASH_SCREEN  !== "false";

function App() {
	const [isFading, setIsFading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!IS_RUN_SPLASH_SCREEN) {
			return;
		}

		const fadeTimer = setTimeout(() => {
			setIsFading(true);
		}, 3000); // 3 seconds delay before starting fade out

		const removeTimer = setTimeout(() => {
			navigate('/portfolio/home', { replace: true });
		}, 5000); // 2 extra second for the fade transition to finish

		return () => {
			clearTimeout(fadeTimer);
			clearTimeout(removeTimer);
		};
	}, [navigate]);

	return (
		<div className="App">
			<CustomCursor />
				<Routes>
					<Route path="/portfolio/home" element={<Home />} />
					<Route path="/portfolio/splash" element={<Splash isFading={isFading} />} />
					<Route path="*" element={<Navigate to={IS_RUN_SPLASH_SCREEN ? "/portfolio/splash" : "/portfolio/home"} replace />} />
				</Routes>
		</div>
	);
}

export default App;
