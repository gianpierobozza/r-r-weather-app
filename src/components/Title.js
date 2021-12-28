import React, { useEffect, useState } from "react";
import { useIntl, FormattedMessage } from "react-intl";

import {
	Box,
	Grid,
	Typography
} from "@material-ui/core";

const Title = () => {
	const intl = useIntl();
	const now = intl.formatDate(Date.now(), {
		year: "numeric",
		month: "long",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	});
	const [dateAndTime, setDateAndTime] = useState(now);

	useEffect(() => {
		const interval = setInterval(() =>
			setDateAndTime(intl.formatDate(Date.now(), {
				year: "numeric",
				month: "long",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit"
			})), 1000
		);
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<Box sx={{ margin: 24 }}>
			<Grid container justifyContent="flex-start">
				<Typography variant="h5" component="div">
					<FormattedMessage id="title_start_today" values={{ date: dateAndTime }} />
				</Typography>
			</Grid>
		</Box>
	)
}

export default Title;
