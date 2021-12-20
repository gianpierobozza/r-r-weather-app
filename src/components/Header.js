import React from "react";
import { FormattedMessage } from "react-intl";
import { LOCALES } from "../i18n/locales";

import {
	AppBar,
	Box,
	Button,
	Container,
	FormControl,
	IconButton,
	InputLabel,
	Menu,
	MenuItem,
	Select,
	Toolbar,
	Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu"

const Header = (props) => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

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
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>

					{/* responsive menu */}
					<Box sx={{ flexGrow: 0.5, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="medium"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						{/* responsive xs menu items */}
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{menu.map(({ path, key }) => (
								<MenuItem key={key} onClick={handleCloseNavMenu}>
									<Typography>
										<FormattedMessage id={key} />
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					{/* normal app name display */}
					<Box sx={{ flexGrow: 0.5, display: 'flex' }}>
						<Typography
							variant="h4"
							noWrap
							component="div"
							sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
						>
							MyWeather
						</Typography>
					</Box>
					{/* end */}

					{/* normal menu items */}
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{menu.map(({ path, key }) => (
							<Button
								key={key}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								<FormattedMessage id={key} />
							</Button>
						))}
					</Box>
					{/* end */}

					{/* lang selector */}
					<Box sx={{ flexGrow: 0 }}>
						<FormControl fullWidth>
							<InputLabel id="language_switcher_label">
								<FormattedMessage id="language_switcher_label" />
							</InputLabel>
							<Select
								labelId="language_switcher_label"
								id="language_switcher"
								value={props.currentLocale}
								onChange={props.handleChange}
							>
								{languages.map(({ name, code }) => (
									<MenuItem key={code} value={code}>
										{name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					{/* end */}

				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Header;