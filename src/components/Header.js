import React from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { LOCALES } from "../i18n/locales";

const Header = (props) => {
	const intl = useIntl();

	const menu = [
		{
			key: "about_project",
			path: "#",
		},
		{
			key: "contact_us",
			path: "#",
		},
	];

	const languages = [
		{ name: "English", code: LOCALES.ENGLISH },
		{ name: "Italiano", code: LOCALES.ITALIAN },
	];

	return (
		<header>
			<div className="container header_content">
				<div className="brand">MyWeather App</div>
				<nav>
					<ul>
						{menu.map(({ path, key }) => (
							<li key={key}>
								<a href={path}>
									<FormattedMessage id={key} />
								</a>
							</li>
						))}
					</ul>
				</nav>
				<div className="spacer"></div>
				<div className="switcher">
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label"><FormattedMessage id="language_switcher_label" /></InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={props.currentLocale}
							label={intl.formatMessage({ id: "language_switcher_label" })}
							onChange={props.handleChange}
						>
							{languages.map(({ name, code }) => (
								<MenuItem key={code} value={code}>
									{name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
			</div>
		</header>
	);
};

export default Header;