import React, { useEffect, useRef, useState } from 'react';
import '../css/customCursor.css';

console.log(`ENV variable : REACT_APP_MOUSE_POINTER_TYPE : ${process.env.REACT_APP_MOUSE_POINTER_TYPE}`);
const MOUSE_POINTER_TYPE_LIST = ['CROSSHAIR', 'CIRCLE'];
let finalMousePointerType = process.env.REACT_APP_MOUSE_POINTER_TYPE || 'CIRCLE';
if (finalMousePointerType === 'RANDOM') {
	const randomIndex = Math.floor(Math.random() * MOUSE_POINTER_TYPE_LIST.length);
	finalMousePointerType = MOUSE_POINTER_TYPE_LIST[randomIndex];
}
console.log(`finalMousePointerType : ${finalMousePointerType}`);

const CustomCursor = () => {
	const containerRef = useRef(null);
	const crosshairRef = useRef(null);
	const innerRef = useRef(null);
	const outerRef = useRef(null);

	const [cursorType] = useState(finalMousePointerType);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const moveCursor = (e) => {
			if (cursorType === 'CROSSHAIR' && crosshairRef.current) {
				crosshairRef.current.style.left = `${e.clientX}px`;
				crosshairRef.current.style.top = `${e.clientY}px`;
			} else if (cursorType === 'CIRCLE') {
				if (innerRef.current) {
					innerRef.current.style.left = `${e.clientX}px`;
					innerRef.current.style.top = `${e.clientY}px`;
				}
				if (outerRef.current) {
					outerRef.current.style.left = `${e.clientX}px`;
					outerRef.current.style.top = `${e.clientY}px`;
				}
			}
		};

		const checkHover = (e) => {
			const isClickable = e.target.closest('a, button, input, select, textarea, img, [tabindex]') || window.getComputedStyle(e.target).cursor === 'pointer';
			if (isClickable) {
				container.classList.add('hover');
			} else {
				container.classList.remove('hover');
			}
		};

		let clickTimeout;
		const clickCursor = (e) => {
			clearTimeout(clickTimeout);
			container.classList.remove('click-left', 'click-right');
			if (e.button === 0) { // Left click: Red
				container.classList.add('click-left');
			} else if (e.button === 2) { // Right click: Yellow
				container.classList.add('click-right');
			}
			clickTimeout = setTimeout(() => { container.classList.remove('click-left', 'click-right'); }, 200);
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
	}, [cursorType]);

	return (
		<div id="custom-cursor" ref={containerRef}>
			{cursorType === 'CROSSHAIR' ? (
				<div className="crosshair-wrapper" ref={crosshairRef}>
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
			) : (
				<>
					<div className="circle-outer" ref={outerRef}></div>
					<div className="circle-inner-wrapper" ref={innerRef}>
						<div className="circle-inner"></div>
					</div>
				</>
			)}
		</div>
	);
};

export default CustomCursor;