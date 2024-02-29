import { common } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
import { error, emerald, info, neutral, success, warning } from "./colors";
import { PaletteMode } from "@mui/material";

export function createPalette() {
	return {
		action: {
			active: neutral[500],
			disabled: alpha(neutral[900], 0.38),
			disabledBackground: alpha(neutral[900], 0.12),
			focus: alpha(neutral[900], 0.16),
			hover: alpha(neutral[900], 0.04),
			selected: alpha(neutral[900], 0.12)
		},
		background: {
			default: common.white,
			paper: common.white
		},
		divider: "#F2F4F7",
		error,
		info,
		mode: "light" as PaletteMode,
		neutral,
		primary: emerald,
		success,
		text: {
			primary: neutral[900],
			secondary: neutral[500],
			disabled: alpha(neutral[900], 0.38)
		},
		warning
	};
}
