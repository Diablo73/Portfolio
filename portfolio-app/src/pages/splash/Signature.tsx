import { useState, useEffect } from 'react';

export default function Signature() {
	// const fonts = ["Fleur De Leah", "Mea Culpa", "Noto Sans Gurmukhi", "Noto Sans Devanagari"];
	const fonts = ["Fleur De Leah", "Mea Culpa"];
	// const fonts = ["Noto Sans Gurmukhi", "Noto Sans Devanagari"];
	
	const [fontFamily, setFontFamily] = useState(() => {
		const randomIndex = Math.floor(Math.random() * fonts.length);
		return fonts[randomIndex];
	});

	let text = "";
	switch(fontFamily) {
		case "Noto Sans Gurmukhi":
			text = "ਆਸ਼ੁਲ ਗੁਪਤਾ";
			break;
		case "Noto Sans Devanagari":
			text = "आशुल गुप्ता";
			break;
		default:
			text = "Ashul Gupta";
	}
	const letters = text.split("");

	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const checkFonts = async () => {
			try {
				await document.fonts.load(`64px "${fontFamily}"`);
				await document.fonts.ready;
				console.log("fontFamily : " + fontFamily);
				setIsReady(true);
			} catch (error) {
				console.log("error : " + error);
				setFontFamily('cursive');
				setIsReady(true);
			}
		};
		checkFonts();
	}, [fontFamily]);

	return (
		<div className="relative">
			<style>{`
				@keyframes drawStroke {
					to { stroke-dashoffset: 0; }
				}

				@keyframes fillText {
					to { fill-opacity: 1; }
				}

				.signature-letter {
					font-family: ${fontFamily};
					font-size: 64px;
					fill: #ffffff;
					fill-opacity: 0;
					stroke: #ffffff;
					stroke-width: 1;
					stroke-dasharray: 200;
					stroke-dashoffset: 200;
				}

				${letters.map((_, i) => `
					.letter-${i} {
						animation: ${isReady ? `drawStroke 0.3s ease-in-out forwards ${i * 0.15}s, fillText 0.2s ease-in forwards ${i * 0.15 + 0.2}s` : 'none'};
					}
				`).join('')}

				.underline-stroke {
					stroke-dasharray: 300;
					stroke-dashoffset: 300;
					animation: ${isReady ? `drawStroke 1s ease-in-out forwards` : 'none'};
					animation-delay: ${letters.length * 0.15 + 0.3}s;
				}
			`}</style>

			<svg width="450" height="200" viewBox="0 0 450 200" className="signature-canvas">

				<text x="225" y="120" textAnchor="middle">
					{letters.map((letter, i) => (
						<tspan key={i} className={`signature-letter letter-${i}`}>
							{letter}
						</tspan>
					))}
				</text>

				<path
					className="underline-stroke"
					d="M 80 145 Q 225 155 370 143"
					fill="none"
					stroke="#ffffff"
					strokeWidth="2"
					strokeLinecap="round"
				/>
			</svg>
		</div>
	);
}
