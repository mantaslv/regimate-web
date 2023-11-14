import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ConsoleLogButton from "../../ConsoleLogButton";
import { Button, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import ExerciseSelector from '../ExerciseSelector';
import Set from '../../Set';
import { useWorkoutContext } from '../../../hooks/useWorkoutContext';

export const WorkoutExerciseCard = ({
    exerciseId,
    setOpenExerciseSelector,
    handleOpenExerciseSelector,
    handleExerciseNameChange,
    handleDeleteExercise,
    openExerciseSelector,
    addSet
}) => {
    const { state } = useWorkoutContext();
    const exercise = state && state.exercises.find((ex) => ex.id === exerciseId);

    return (
        <Card sx={{ mt: 2, /*backgroundColor: 'grey.200'*/}}> 
            <CardHeader 
                title={
                    <Button onClick={handleOpenExerciseSelector}>
                        <Typography variant="h6" fontSize={16}>
                            {exercise.exerciseName}
                        </Typography>
                    </Button>
                }>
            </CardHeader>
            <CardContent>
                {exercise.sets && exercise.sets.map(set => (
                    <Set key={set.id} exerciseId={exerciseId} setId={set.id}/>
                ))}
                <Grid container spacing={1} marginTop={0} alignItems="center">
                    <Grid item>
                        <Button variant="contained" onClick={addSet}>Add Set</Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant="contained" 
                            color="error" 
                            onClick={handleDeleteExercise}
                            disabled={state.exercises.length <= 1}
                            sx={{ justifyContent: "space-between" }}
                            aria-label="Delete Exercise"
                            title="Click to remove this exercise"
                        >
                            <RemoveCircleIcon sx={{ mr: 1 }}/>
                            DELETE EXERCISE
                        </Button>
                    </Grid>
                    <Grid item>
                        <ConsoleLogButton print={exercise} info="exercise"/>
                    </Grid>
                </Grid>
                {openExerciseSelector && (
                    <ExerciseSelector inWorkout
                        openExerciseSelector={openExerciseSelector} 
                        onOpenDialog={setOpenExerciseSelector}
                        onExerciseSelection={handleExerciseNameChange}
                    />
                )}
            </CardContent>
        </Card>
    );
};