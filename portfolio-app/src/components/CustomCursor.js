import React, { useEffect, useRef } from 'react';
import '../css/crosshair.css';

const CustomCursor = () => {
	const cursorRef = useRef(null);

	useEffect(() => {
		const cursor = cursorRef.current;
		if (!cursor) return;

		const moveCursor = (e) => {
			cursor.style.left = `${e.clientX}px`;
			cursor.style.top = `${e.clientY}px`;
		};

		const checkHover = (e) => {
			const isClickable = e.target.closest('a, button, input, select, textarea, img, [tabindex]') || window.getComputedStyle(e.target).cursor === 'pointer';
			if (isClickable) {
				cursor.classList.add('hover');
			} else {
				cursor.classList.remove('hover');
			}
		};

		let clickTimeout;
		const clickCursor = (e) => {
			clearTimeout(clickTimeout);
			cursor.classList.remove('click-left', 'click-right');
			if (e.button === 0) { // Left click: Red
				cursor.classList.add('click-left');
			} else if (e.button === 2) { // Right click: Yellow
				cursor.classList.add('click-right');
			}
			clickTimeout = setTimeout(() => { cursor.classList.remove('click-left', 'click-right'); }, 200);
		};

		window.addEventListener('mousemove', moveCursor);
		window.addEventListener('mouseover', checkHover);
		window.addEventListener('mousedown', clickCursor);

		return () => {
			clearTimeout(clickTimeout);
			window.removeEventListener('mousemove', moveCursor);
			window.removeEventListener('mouseover', checkHover);
			window.removeEventListener('mousedown', clickCursor);
		};
	}, []);

	return (
		<div id="custom-cursor" ref={cursorRef}>
			{/* Moved SVG here, updating attributes to camelCase for React */}
			<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
				<g stroke="#000" strokeWidth="4">
					<line x1="16" y1="2" x2="16" y2="10" />
					<line x1="16" y1="22" x2="16" y2="30" />
					<line x1="2" y1="16" x2="10" y2="16" />
					<line x1="22" y1="16" x2="30" y2="16" />
					<circle className="crosshair-center-base" cx="16" cy="16" />
				</g>
				<g className="crosshair-top" stroke="#00ff00" strokeWidth="2">
					<line x1="16" y1="2" x2="16" y2="10" />
					<line x1="16" y1="22" x2="16" y2="30" />
					<line x1="2" y1="16" x2="10" y2="16" />
					<line x1="22" y1="16" x2="30" y2="16" />
					<circle className="crosshair-center" cx="16" cy="16" />
				</g>
			</svg>
		</div>
	);
};

export default CustomCursor;