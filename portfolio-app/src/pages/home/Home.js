import React, { useEffect } from 'react';
import { initParticles } from '../../js/particles.js';

function Home() {
	useEffect(() => {
		initParticles();
	}, []);

	return (
		<div id="home" style={{ animation: 'fadeIn 2s ease-in-out' }}>
			<section className="center">
				<div id="particles-js"></div>
			</section>
			<div className="splash-container">
				<a href="https://www.example.com">Visit Example</a>
				<h1>Hello World</h1>
			</div>
		</div>

	);
}

export default Home;
