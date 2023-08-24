import { useEffect } from "react";
import { Box, Button, Grid, Input, TextField, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { ExerciseContextProvider } from "../context/exerciseContext";
import Exercise from "./ExerciseComponent";
import ConsoleLogButton from "./ConsoleLogButton";

const WorkoutComponent = ({programme=false, index, exerciseList, onWorkoutChange = () => {}}) => {
    const { state, dispatch } = useWorkoutContext();
    const { exercises } = state;

    const handleWorkoutNameChange = (event) => {
        dispatch({ type: "UPDATE_WORKOUT_NAME", payload: event.target.value });
    };

    const addExercise = () => {
        dispatch({ type: "ADD_EXERCISE" });
    };

    const handleExerciseChange = (updatedExercise, id) => {
        dispatch({ type: "UPDATE_EXERCISE", payload: { id, changes: updatedExercise } });
    };

    const handleExerciseDelete = (id) => {
        dispatch({ type: "DELETE_EXERCISE", payload: id });
    };

    useEffect(() => {
        onWorkoutChange(state);
    }, [state])

    if (programme) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column', 
                    alignItems: 'center',
                    borderRadius: '16px',
                    border: '3px solid',
                    borderColor: 'grey.400',
                    padding: '8px 16px',
                    width: '80%'
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography color="grey.700" >Day {index + 1}</Typography>
                    <Input
                        disableUnderline
                        placeholder="workout name"
                        onChange={handleWorkoutNameChange}
                        sx={{
                            // m: 1,
                            width: '70%',
                            // color: 'white', 
                            borderRadius: '10px',
                            border: '2px solid',
                            borderColor: `grey.300`,
                            // backgroundColor: 'grey.600', 
                            '& input': { textAlign: 'center' },
                            '&:hover': { backgroundColor: '#e6f2f1' },
                        }}
                    />
                </Box>
                {exercises && exercises.map((exercise) => (
                    <ExerciseContextProvider key={exercise.id}>
                        <Exercise
                            exercise={exercise}
                            exerciseList={exerciseList}
                            onExerciseChange={(updatedExercise) => handleExerciseChange(updatedExercise, exercise.id)}
                            onExerciseDelete={() => handleExerciseDelete(exercise.id)}
                            programme={true}
                        />
                    </ExerciseContextProvider>
                ))}
                <Button
                    onClick={addExercise}
                    sx={{
                        margin: 1,
                        borderRadius: '16px',
                        border: `3px dashed`,
                        borderColor: `grey.400`,
                        width: '100%'
                    }}
                >
                    <AddCircleOutlineIcon sx={{ color: 'grey.400', fontSize: 30 }}/>
                </Button>
                <ConsoleLogButton print={state} info="workout"/>
            </Box>
        )
    } else {
        return (
            <Box>
                <TextField 
                    label="Workout Name" 
                    variant="filled"
                    onChange={handleWorkoutNameChange}
                />
                {exercises && exercises.map((exercise) => (
                    <ExerciseContextProvider key={exercise.id}>
                        <Exercise
                            exercise={exercise}
                            exerciseList={exerciseList}
                            onExerciseChange={(updatedExercise) => handleExerciseChange(updatedExercise, exercise.id)}
                            onExerciseDelete={() => handleExerciseDelete(exercise.id)}
                        />
                    </ExerciseContextProvider>
                ))}
                <Grid container spacing={2} marginTop={0}>
                    <Grid item>
                        <Button variant="contained" onClick={addExercise}>
                            Add Exercise
                        </Button>
                    </Grid>
                    <Grid item>
                        <ConsoleLogButton print={state} info="workout"/>
                    </Grid>
                </Grid>
            </Box>
        );
    };
};

export default WorkoutComponent;