import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export const Logo: FC = () => {
	return (
		<Box sx={{ display: "inline-flex", alignItems: "center", verticalAlign: "middle" }}>
			<Icon/>
			<Typography
				variant="h5"
				sx={{ letterSpacing: ".3rem", fontFamily: "Roboto Mono" }}
			>
                REGIMATE
			</Typography>
		</Box>
	);
};

const Icon: FC = () => {
	return (
		<Box position="relative" display="flex" sx={{ mr: ".3rem" }}>
			<CalendarTodayIcon sx={{ fontSize: "1.5rem" }} />
			<Box
				position="absolute"
				top="36%"
				left="25%"
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<FitnessCenterIcon style={{ fontSize: "0.75rem" }} />
			</Box>
		</Box>
	);
};