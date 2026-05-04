import logo from '../resources/logo.svg';
import '../css/App.css';
import { useState, useEffect } from "react";
import Splash from '../pages/splash/Splash.js';

function App() {
	const [isSplashScreen, setIsSplashScreen] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsSplashScreen(false);
		}, 3000); // 3 seconds delay

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="App">
			{isSplashScreen ? <Splash /> : <Splash />}
		</div>
	);
}

export default App;
