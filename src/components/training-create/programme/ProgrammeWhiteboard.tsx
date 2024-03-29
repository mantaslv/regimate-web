import React, { FC } from "react";
import { Box } from "@mui/material";
import AddTrainingItemButton from "../../styled-components/AddTrainingItemButton";
import Workout from "../Workout";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";
import { ProgrammeReducerAction } from "../../../types";

interface ProgrammeWhiteboardProps {
	handleAddWorkout: () => void;
}

const ProgrammeWhiteboard: FC<ProgrammeWhiteboardProps> = ({ handleAddWorkout }) => { 
	const { state, dispatch } = useProgrammeContext();

	return (
		<Box
			display="flex" 
			justifyContent="flex-start" 
			alignItems="flex-start" 
			gap={2} 
			sx={{ ml: 2, height: "100%" }}
		>
			{state.workouts.map((workout, i) => (
				<Box key={workout.id}
					sx={{ 
						minWidth: "220px", 
						minHeight: "100%",
						display: "flex",
						flexDirection: "column",
						

					}}>
					<Workout 
						inWorkout={false} 
						index={i} 
						workoutId={workout.id} 
						dispatch={dispatch as React.Dispatch<ProgrammeReducerAction>}
					/>
				</Box>
			))}
			{/* {state.workouts.length < 7 && (
				<Box>
					<AddTrainingItemButton 
						onClick={handleAddWorkout} 
						sx={{
							m: -1,
							height: "100%",
							maxWidth: "10px"
						}}
					/>
				</Box>
			)} */}
		</Box>
	);
};

export default ProgrammeWhiteboard;