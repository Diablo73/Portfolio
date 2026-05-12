import React, { useEffect, useState } from 'react';
import { initParticles } from '../../js/Particles.js';
import Header from '../../js/Header.js';
import { fetchGoogleSheetData } from '../../js/GoogleSheetData.js';
import diablo_developer from '../../resources/diablo_developer.png';
import './Home.css';

function Home() {
	const [typedText, setTypedText] = useState('');
	const fullText = "Hi, I am Ashul Gupta";

	useEffect(() => {
		initParticles();

		let currentText = '';
		let currentIndex = 0;
		
		const typingInterval = setInterval(() => {
			if (currentIndex < fullText.length) {
				currentText += fullText[currentIndex];
				setTypedText(currentText);
				currentIndex++;
			} else {
				clearInterval(typingInterval);
			}
		}, 100); // 100ms per character typing speed

		fetchGoogleSheetData();

		return () => clearInterval(typingInterval);
	}, []);

	return (
		<div id="home" style={{ animation: 'fadeIn 2s ease-in-out' }}>
			<Header />
			<section className="center">
				<div id="particles-js"></div>
			</section>
			<div className="home-content">
				<div className="text-section">
					<h1 className="typing-text">
						{typedText}<span className="cursor">|</span>
					</h1>
				</div>
				<div className="image-section">
					<img src={diablo_developer} alt="diablo_developer" className="diablo_developer-image" />
				</div>
			</div>
		</div>
	);
}

export default Home;
