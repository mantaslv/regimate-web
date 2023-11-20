import { Box, Button, Grid, IconButton, Input } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Exercise from "../Exercise";
import ConsoleLogButton from "../../styled-components/ConsoleLogButton";
import ExerciseSelector from "../ExerciseSelector";
import AddTrainingItemButton from "../../styled-components/AddTrainingItemButton";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export const ProgrammeSplitCard = ({
    handleWorkoutNameChange,
    onOpenDialog,
    openExerciseSelector,
    handleDeleteWorkout,
    handleMoveWorkout,
    addExercise,
    workoutId,
    index
}) => {
    const { state } = useProgrammeContext();
    const workout = state.workouts.find((wo) => wo.id === workoutId);

    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column', 
                alignItems: 'center'
            }}
        >
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                width: '100%' 
            }}>
                <Input
                    disableUnderline
                    placeholder="workout name"
                    value={workout.workoutName}
                    onChange={handleWorkoutNameChange}
                    sx={{
                        width: '70%',
                        borderRadius: '10px',
                        border: '2px solid',
                        borderColor: `grey.300`,
                        '& input': { textAlign: 'center' },
                        '&:hover': { backgroundColor: '#e6f2f1' },
                    }}
                />
                <IconButton onClick={handleDeleteWorkout}>
                    <RemoveCircleIcon/>
                </IconButton>
            </Box>
            {workout.exercises && workout.exercises.map((ex) => (
                <Exercise key={ex.id} exerciseId={ex.id} workoutId={workoutId}/>
            ))}
            <AddTrainingItemButton 
                onClick={() => onOpenDialog(true)} 
                sx={{ m: 1, width: '100%' }}
            />
            {openExerciseSelector && (
                <ExerciseSelector 
                    openExerciseSelector={openExerciseSelector} 
                    onOpenDialog={onOpenDialog}
                    onExerciseSelection={addExercise}
                />
            )}
            <Grid container 
                spacing={2} 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center' 
                }}
            >
                <Grid item>
                    <Button 
                        variant="outlined"
                        onClick={() => handleMoveWorkout('left')}
                        disabled={index === 0}
                    >
                        <KeyboardArrowLeftIcon/>
                    </Button>
                </Grid>
                <Grid item>
                    <ConsoleLogButton print={workout} info="workout"/>
                </Grid>
                <Grid item>
                    <Button 
                        variant="outlined"
                        onClick={() => handleMoveWorkout('right')}
                        disabled={index === state.workouts.length - 1}
                    >
                        <KeyboardArrowRightIcon/>
                    </Button>
                </Grid>
            </Grid>
            
        </Box>
    )
}