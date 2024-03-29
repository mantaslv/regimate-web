import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Signup = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const {signup, error, isLoading} = useSignup();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await signup(email, password);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				padding={4}
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					backgroundColor: "white",
					borderRadius: 2
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">Sign up</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					{error && (
						<Alert severity="error">{error}</Alert>
					)}
					<TextField
						margin="normal"
						variant='filled'
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant='filled'
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						type={showPassword? "text" : "password"}
						id="password"
						autoComplete="current-password"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={() => setShowPassword(!showPassword)}
										onMouseDown={() => setShowPassword(!showPassword)}
									>
										{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
									</IconButton>
								</InputAdornment>
							)
						}}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						disabled={isLoading}
						sx={{ mt: 3, mb: 2 }}
					>Sign Up</Button>
                    
					<Grid container justifyContent="center" alignItems="center"> 
						<Grid item>
							<Link href="/login" variant="body2">
                                Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default Signup;