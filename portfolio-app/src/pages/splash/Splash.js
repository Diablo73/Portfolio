import React from 'react';
import './Splash.css';
import '../../css/fonts.css';
import Signature from './Signature.tsx';

function Splash() {
	return (
		<div className="splash-container">
			<Signature />
			<div className="atom">
				<div className="electron"></div>
				<div className="electron-alpha"></div>
				<div className="electron-omega"></div>
			</div>
		</div>
	);
}

export default Splash;
