import { useState } from "react";
import { IntlProvider } from "react-intl";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Header from "./Header.js";
import Title from "./Title.js";
import APIContextProvider from "../contexts/APIContext.js";
import CurrentWeatherSearch from "./weather/CurrentWeatherSearch.js";
import Footer from "./Footer.js";
import { LOCALES } from "../i18n/locales.js";
import { messages } from "../i18n/messages.js";

import {
	Box,
	Button,
	ButtonGroup,
	Grid,
	Typography
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../themes/theme";

const App = () => {
	const [currentLocale, setCurrentLocale] = useState(getInitialLocale());
	const [cities, setCities] = useState([0]);
	const [cardsTransitionStates, setCardsTransitionStates] = useState([true]);

	function addComponent(e) {
		e.preventDefault();
		var newId = cities.length;
		setCities([...cities, newId]);
		setCardsTransitionStates([...cardsTransitionStates, true]);
	}

	function removeLastComponent(e) {
		e.preventDefault();
		setCardsTransitionStates(cardsTransitionStates.slice(0, -1));
		setCities(cities.slice(0, -1));
	}

	const handleLanguageChange = (e) => {
		setCurrentLocale(e.target.value);
		localStorage.setItem("locale", e.target.value);
	};

	function getInitialLocale() {
		const savedLocale = localStorage.getItem("locale");
		return savedLocale || LOCALES.ENGLISH;
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<IntlProvider messages={messages[currentLocale]} locale={currentLocale} defaultLocale={LOCALES.ENGLISH}>
				<Header currentLocale={currentLocale} handleLanguageChange={handleLanguageChange} />
				<Box>
					<Grid container>
						<Grid item xs={8}>
							<Title />
						</Grid>
						<Grid item xs={4}>
							<Grid container justifyContent="flex-end">
								<Box sx={{ padding: 18 }}>
									<ButtonGroup variant="contained" aria-label="outlined primary button group">
										<Button onClick={addComponent}><Typography variant="h6">+</Typography></Button>
										<Button disabled={cities.length === 1} onClick={removeLastComponent}><Typography variant="h6">-</Typography></Button>
									</ButtonGroup>
								</Box>
							</Grid>
						</Grid>
					</Grid>
				</Box>
				<APIContextProvider>
					<Grid container justifyContent="center">
						<TransitionGroup className="city-weather-group">
							{cities.map((i) => (
								<CSSTransition
									key={i}
									in={cardsTransitionStates[i]}
									timeout={200}
									classNames="city-weather-card">
									<Grid item key={i}>
										<CurrentWeatherSearch key={i} />
									</Grid>
								</CSSTransition>
							))}
						</TransitionGroup>
					</Grid>
				</APIContextProvider>
				<Footer />
			</IntlProvider>
		</ThemeProvider>
	);
};

export default App;
