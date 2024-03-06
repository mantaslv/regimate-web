import { Box, Dialog, DialogContent, DialogTitle, List, ListItemButton, ListItemText, TextField } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";
import { useWorkoutContext } from "../../../hooks/useWorkoutContext";
import { ExerciseListObjectType } from "../../../types";

// interface ExerciseSelectorProps {
// 	isExerciseSelectorOpen: boolean;
// 	onOpenDialog: (value: boolean) => void;
// 	onExerciseSelection: (exerciseName: string) => void;
// 	inWorkout?: boolean;
// }

// const ExerciseSelector: FC<ExerciseSelectorProps> = ({ 
// 	isExerciseSelectorOpen, 
// 	onOpenDialog, 
// 	onExerciseSelection, 
// 	inWorkout=false
// }) => {
const ExerciseSelector = () => {
	// const { state } = inWorkout ? useWorkoutContext() : useProgrammeContext();
	const { state } = useProgrammeContext();
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [exerciseList, setExerciseList] = useState<ExerciseListObjectType[]>([]);

	useEffect(() => setExerciseList(state.exerciseList), [state]);

	const exactMatchFilteredExercises = exerciseList?.filter((exercise: ExerciseListObjectType) => 
		exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
	) ?? [];

	const splitMatchFilteredExercises = exerciseList?.filter(exercise => 
		!exactMatchFilteredExercises.includes(exercise) &&
			searchTerm.toLowerCase().split(" ").every(word => 
				exercise.name.toLowerCase().split(" ").includes(word)
			)
	) ?? [];

	const partialMatchFilteredExercises = exerciseList?.filter(exercise => 
		!exactMatchFilteredExercises.includes(exercise) &&
        !splitMatchFilteredExercises.includes(exercise) &&
			searchTerm.toLowerCase().split(" ").some(word =>
				exercise.name.toLowerCase().split(" ").includes(word)
			)
	) ?? [];
    
	const filteredExercises = [
		...exactMatchFilteredExercises, 
		...splitMatchFilteredExercises, 
		...partialMatchFilteredExercises
	];

	const handleSearchChange = (event: { target: { value: string }; }) => {
		setSearchTerm(event.target.value);
	};

	const handleCloseDialog = () => {
		// onOpenDialog(false);
	};

	const handleExerciseSelection = (exerciseName: string) => {
		handleCloseDialog();
		// onExerciseSelection(exerciseName);
	};

	return(
		<Box>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<TextField label="Search" value={searchTerm} onChange={handleSearchChange} sx={{ mt: 1 }}/>
			</Box>
			<List>
				{filteredExercises?.map((exercise, i) => 
					<ListItemButton key={i} onClick={() => handleExerciseSelection(exercise.name)}>
						<ListItemText primary={exercise.name}/>
					</ListItemButton>
				)}
			</List>
		</Box>
	);
};

export default ExerciseSelector;