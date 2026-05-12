import React, { useEffect, useState } from 'react';
import { initParticles } from '../../js/Particles.js';
import Header from '../../js/Header.js';
import { GOOGLE_SHEET_DATA_MAP } from '../../js/GoogleSheetData.js';
import diablo_developer from '../../resources/diablo_developer.png';
import './Home.css';

function Home() {
	const [typedText, setTypedText] = useState('');

	useEffect(() => {
		initParticles();

		let typingTimer;
		let isCancelled = false;

		const initializeTyping = async () => {
			try {
				const dataMap = await GOOGLE_SHEET_DATA_MAP;
				if (isCancelled) return;

				const aboutMeList = dataMap && dataMap["aboutMe"] && dataMap["aboutMe"].length 
					? dataMap["aboutMe"] 
					: ["Hi, I am Ashul Gupta"];

				let currentStringIndex = 0;
				let currentCharIndex = 0;
				let accumulatedText = "";

				const handleTyping = () => {
					const currentString = aboutMeList[currentStringIndex];

					// Skip over HTML tags to type them instantly without showing brackets
					if (currentString[currentCharIndex] === '<') {
						const closingIndex = currentString.indexOf('>', currentCharIndex);
						if (closingIndex !== -1) {
							currentCharIndex = closingIndex + 1;
						} else {
							currentCharIndex++;
						}
					} else {
						currentCharIndex += 2; // Advance multiple characters at once to bypass browser minimum timeout limits
						if (currentCharIndex > currentString.length) currentCharIndex = currentString.length;
					}

					const currentlyTyping = currentString.substring(0, currentCharIndex);
					setTypedText(accumulatedText + currentlyTyping);

					let typingSpeed = 0.1; // Fast typing speed

					if (currentCharIndex >= currentString.length) {
						accumulatedText += currentString + "<br/><br/>"; // Break after each element
						currentStringIndex++;
						currentCharIndex = 0;
						typingSpeed = 600; // Small rest between elements

						if (currentStringIndex >= aboutMeList.length) {
							return; // Stop typing when everything is done
						}
					}

					typingTimer = setTimeout(handleTyping, typingSpeed);
				};

				typingTimer = setTimeout(handleTyping, 500);
			} catch (error) {
				console.error("Failed to load sheet data:", error);
			}
		};

		initializeTyping();

		return () => {
			isCancelled = true;
			clearTimeout(typingTimer);
		};
	}, []);

	return (
		<div id="home" style={{ animation: 'fadeIn 2s ease-in-out' }}>
			<Header />
			<section className="center">
				<div id="particles-js"></div>
			</section>
			<div className="home-content">
				<div className="text-section">
					<div className="typing-text">
						<span dangerouslySetInnerHTML={{ __html: typedText }} />
						<span className="cursor">|</span>
					</div>
				</div>
				<div className="image-section">
					<img src={diablo_developer} alt="diablo_developer" className="diablo_developer-image" />
				</div>
			</div>
		</div>
	);
}

export default Home;
