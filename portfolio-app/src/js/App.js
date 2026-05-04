import { useState, useEffect } from "react";
import '../css/App.css';
import Home from '../pages/home/Home.js';
import Splash from '../pages/splash/Splash.js';

function App() {
	const [isSplashScreen, setIsSplashScreen] = useState(true);
	const [isFading, setIsFading] = useState(false);

	useEffect(() => {
		const fadeTimer = setTimeout(() => {
			setIsFading(true);
		}, 3000); // 3 seconds delay before starting fade out

		const removeTimer = setTimeout(() => {
			setIsSplashScreen(false);
		}, 5000); // 2 extra second for the fade transition to finish

		return () => {
			clearTimeout(fadeTimer);
			clearTimeout(removeTimer);
		};
	}, []);

	return (
		<div className="App">
			{isSplashScreen ? <Splash isFading={isFading} /> : <Home />}
		</div>
	);
}

export default App;
