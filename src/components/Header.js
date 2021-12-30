import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { LOCALES } from "../i18n/locales";

import {
	AppBar,
	Backdrop,
	Box,
	Button,
	Container,
	FormControl,
	IconButton,
	InputLabel,
	Link,
	Menu,
	MenuItem,
	Modal,
	Select,
	Toolbar,
	Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu"

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minWidth: 300,
	maxWidth: 700,
	bgcolor: 'DarkSalmon',
	border: '2px solid crimson',
	borderRadius: 8,
	boxShadow: 24,
	p: 4,
};

const Header = (props) => {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
	const handleCloseNavMenu = () => setAnchorElNav(null);

	const [openInfo, setOpenInfo] = useState(false);
	const handleOpenInfo = () => setOpenInfo(true);
	const handleCloseInfo = () => setOpenInfo(false);
	
	const [openContacts, setOpenContacts] = useState(false);
	const handleOpenContacts = () => setOpenContacts(true);
	const handleCloseContacts = () => setOpenContacts(false);

	const languages = [
		{ name: "English", code: LOCALES.ENGLISH },
		{ name: "Italiano", code: LOCALES.ITALIAN },
	];

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>

					{/* responsive menu */}
					<Box sx={{ flexGrow: 0.5, display: { xs: "flex", md: "none" } }}>
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
								vertical: "bottom",
								horizontal: "left",
							}}
							getContentAnchorEl={null}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							<MenuItem key="about_project" onClick={handleOpenInfo}>
								<Typography>
									<FormattedMessage id="about_project" />
								</Typography>
							</MenuItem>
							<MenuItem key="contact_us" onClick={handleOpenContacts}>
								<Typography>
									<FormattedMessage id="contact_us" />
								</Typography>
							</MenuItem>
						</Menu>
					</Box>
					{/* normal app name display */}
					<Box sx={{ flexGrow: 0.5, display: "flex" }}>
						<Typography
							variant="h4"
							noWrap
							component="div"
							sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
						>
							MyWeather
						</Typography>
					</Box>
					{/* end */}

					{/* normal menu items */}
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						<Button
							key="about_project"
							onClick={handleOpenInfo}
							sx={{ my: 2, color: "white", display: "block" }}
						>
							<FormattedMessage id="about_project" />
						</Button>
						<Button
							key="contact_us"
							onClick={handleOpenContacts}
							sx={{ my: 2, color: "white", display: "block" }}
						>
							<FormattedMessage id="contact_us" />
						</Button>
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
								onChange={props.handleLanguageChange}
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
			<Modal
				open={openInfo}
				onClose={handleCloseInfo}
				aria-labelledby="info-modal-title"
				aria-describedby="info-modal-description"
				closeAfterTransition
				BackdropComponent={Backdrop}
			>
				<Box sx={style}>
					<Typography id="info-modal-title" variant="h6" component="h2">
						<FormattedMessage id="about_project" />
					</Typography>
					<Typography id="info-modal-description" sx={{ mt: 2 }}>
						<FormattedMessage id="about_project_modal_description" />
					</Typography>
				</Box>
			</Modal>
			<Modal
				open={openContacts}
				onClose={handleCloseContacts}
				aria-labelledby="info-modal-title"
				aria-describedby="info-modal-description"
				closeAfterTransition
				BackdropComponent={Backdrop}
			>
				<Box sx={style}>
					<Typography id="info-modal-title" variant="h6" component="h2">
						<FormattedMessage id="contact_us" />
					</Typography>
					<Typography id="info-modal-description" sx={{ mt: 2 }}>
						<FormattedMessage id="contact_us_modal_description" /><br />
						<Link href="https://twitter.com/MrGiaBoz" target="_blank" rel="noopener">MrGiaBoz</Link>
					</Typography>
				</Box>
			</Modal>
		</AppBar>
	);
};

export default Header;