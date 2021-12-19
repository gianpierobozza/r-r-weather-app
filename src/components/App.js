import { useState } from "react";
import { IntlProvider } from "react-intl";
import Header from "./Header.js";
import CurrentWeatherSearch from "./CurrentWeatherSearch.js";
import Footer from "./Footer.js";
import { LOCALES } from "../i18n/locales.js";
import { messages } from "../i18n/messages.js";

const App = () => {
	const [currentLocale, setCurrentLocale] = useState(getInitialLocale());

	const handleChange = (e) => {
		setCurrentLocale(e.target.value);
		localStorage.setItem("locale", e.target.value);
	};

	function getInitialLocale() {
		const savedLocale = localStorage.getItem("locale");
		return savedLocale || LOCALES.ENGLISH;
	}

	return (
		<IntlProvider messages={messages[currentLocale]} locale={currentLocale} defaultLocale={LOCALES.ENGLISH}>
			<div id="appContainer">
				<Header currentLocale={currentLocale} handleChange={handleChange} />
				<CurrentWeatherSearch />
				<Footer />
			</div>
		</IntlProvider>
	);
};

export default App;
