export const fetchGoogleSheetData = async () => {
	let gasApiId = process.env.REACT_APP_GAS_API_ID;

	if (!gasApiId) {
		console.warn("Skipping Google Sheets fetch: Missing REACT_APP_GAS_API_ID");
		return null;
	}

	try {
		const response = await fetch(`https://script.google.com/macros/s/${gasApiId}/exec?flow=React`);
		const data = await response.json();
		console.log("Google Sheets Data : ", data);
		return data;
	} catch (error) {
		console.error("Failed to fetch Google Sheets data:", error);
		return {};
	}
};
