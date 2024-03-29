import React, { FC } from "react";
import { Box, Button, Grid } from "@mui/material";
import Exercise from "../Exercise";
import ExerciseSelector from "../exercise-selector/ExerciseSelector";
import { useWorkoutContext } from "../../../hooks/useWorkoutContext";
import { WorkoutReducerAction } from "../../../types";

interface WorkoutCardProps {
	isExerciseSelectorOpen: boolean;
	addExercise: (exerciseName: string) => void;
	onOpenDialog: (value: boolean) => void;
}

export const WorkoutCard: FC<WorkoutCardProps> = ({
	isExerciseSelectorOpen,
	addExercise,
	onOpenDialog,
}) => {
	const { state, dispatch } = useWorkoutContext();

	return (
		<Box sx={{ display: "flex", justifyContent: "center" }}>
			<Box>
				{state.exercises?.map((exercise) => (
					<Exercise inWorkout workoutId={undefined} key={exercise.id} exerciseId={exercise.id} dispatch={dispatch as React.Dispatch<WorkoutReducerAction>}/>
				))}
				<Grid container spacing={2} marginTop={0} sx={{ display: "flex", justifyContent: "center" }}>
					<Grid item>
						<Button 
							variant="contained" 
							aria-label="add-exercise-btn"
							onClick={() => onOpenDialog(true)}
						>
                            Add Exercise
						</Button>
						{isExerciseSelectorOpen && (
							<ExerciseSelector inWorkout
								isExerciseSelectorOpen={isExerciseSelectorOpen} 
								onOpenDialog={onOpenDialog}
								onExerciseSelection={addExercise}
							/>
						)}
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};