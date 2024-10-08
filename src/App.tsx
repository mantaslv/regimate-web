import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { createTheme } from "./theme";
import { useAuthContext } from "./hooks/useAuthContext";

import Navbar from "./components/layout/Navbar";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import TrainingEditorPage from "./pages/TrainingEditorPage";
import ViewTrainingPage from "./pages/ViewTrainingPage";
import AdminPage from "./pages/AdminPage";
import { AdminExerciseListContextProvider } from "./context/adminExerciseListContext";
import CalendarPage from "./pages/CalendarPage";
import ErgScraperPage from "./pages/ErgScraper";

const theme = createTheme();

const App = () => {
	const { user } = useAuthContext();

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Navbar />
				<Box>
					<Routes>
						{/* <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} /> */}
						<Route path='/' element={user ? <Navigate to="/view-programmes" /> : <Navigate to="/create-programme" />} />
						<Route path='/login' element={!user ? <Login/> : <Navigate to="/" />} />
						<Route path='/signup' element={!user ? <Signup/>: <Navigate to="/" />} />
						<Route path='/create-workout' element={user ? <TrainingEditorPage isWorkout/> : <Navigate to="/login" />} />
						<Route path='/create-programme' element={<TrainingEditorPage isProgramme/>} />
						<Route path='/view-workouts' element={user ? <ViewTrainingPage isWorkout/> : <Navigate to="/login" />} />
						<Route path='/view-programmes' element={user ? <ViewTrainingPage isProgramme/> : <Navigate to="/login" />} />
						<Route path='/calendar' element={user ? <CalendarPage/> : <Navigate to="/login" />} />
						<Route path='/erg-scraper' element={user ? <ErgScraperPage/> : <Navigate to="/login" />} />
						<Route path='/admin' element={
							user?.role === "admin" 
								? <AdminExerciseListContextProvider><AdminPage /></AdminExerciseListContextProvider> 
								: <Navigate to="/" />
						}/>
					</Routes>
				</Box>
			</BrowserRouter>
		</ThemeProvider>    
	);
};

export default App;