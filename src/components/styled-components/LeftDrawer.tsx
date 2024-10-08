import React, { FC }from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography } from "@mui/material";

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: "center",
}));

interface LeftDrawerProps {
    open: boolean;
    drawerWidth: number;
	drawerHeader: string;
	children?: React.ReactNode;
}

const LeftDrawer: FC<LeftDrawerProps> = ({ open, drawerWidth, drawerHeader, children }) => {
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						backgroundColor: "#f7f7f7",
						mt: "45px",
						boxSizing: "border-box",
						borderRight: "1px solid #dcdcdc", 
						boxShadow: "inset -5px 0 15px #0000000d"
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader sx={{ 
					"&": { 
						borderBottom: "1px solid #dcdcdc", 
						minHeight: "45px" 
					}, 
					height: "45px" 
				}}>
					<Typography variant="h6" sx={{ color: "#808080" }}>
						{drawerHeader}
					</Typography>
				</DrawerHeader>
				{children}
			</Drawer>
		</Box>
	);
};

export default LeftDrawer;