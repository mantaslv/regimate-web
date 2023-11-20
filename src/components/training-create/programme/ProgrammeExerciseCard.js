import { Box, Button, IconButton, Typography } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SetsRepsInput from "../programme/SetsRepsInput";
import { useProgrammeContext } from "../../../hooks/useProgrammeContext";
import ExerciseSelector from "../ExerciseSelector";
import { useEffect, useState } from "react";

export const ProgrammeExerciseCard = ({ 
    workoutId,
    exerciseId,
    setOpenExerciseSelector,
    handleOpenExerciseSelector,
    handleExerciseNameChange,
    handleDeleteExercise,
    openExerciseSelector,
}) => {
    const { state } = useProgrammeContext();
    const workout = state.workouts.find((wo) => wo.id === workoutId);
    const [exercise, setExercise] = useState(workout && workout.exercises.find((ex) => ex.id === exerciseId))
    
    useEffect(() => {
        setExercise(workout && workout.exercises.find((ex) => ex.id === exerciseId))
    }, [state])

    return (
        <Box sx={{ 
            borderRadius: '10px', 
            backgroundColor: '#6366F1', 
            width: '100%', 
            mt: 1 
        }}>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <Button 
                        onClick={handleOpenExerciseSelector} 
                        sx={{ 
                            minWidth: 0, 
                            borderRadius: '10px', 
                            px: 1,  
                            mx: 0.5 
                        }}
                    >
                        <Typography 
                            variant="h6" 
                            fontSize={13}
                            fontWeight={600}
                            textAlign="left"
                            textTransform="none"
                            sx={{ 
                                color: 'white', 
                                width: '100%', 
                                '&:hover': { color: 'grey.400' }
                            }}
                        >
                            {exercise.exerciseName}
                        </Typography>
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <IconButton
                        onClick={handleDeleteExercise} 
                        sx={{ color: 'white' }}
                    >
                        <RemoveCircleIcon sx={{ 
                            ml: -1, 
                            mt: -0.5, 
                            mr: -0.5, 
                            fontSize: '16px' 
                        }}/>
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                alignItems: 'center', 
                mt: -1.5 
            }}>
                <SetsRepsInput 
                    key={exerciseId} 
                    workoutId={workoutId} 
                    exerciseId={exerciseId}
                />
            </Box>
            {openExerciseSelector && (
                <ExerciseSelector
                    openExerciseSelector={openExerciseSelector} 
                    onOpenDialog={setOpenExerciseSelector}
                    onExerciseSelection={handleExerciseNameChange}
                />
            )}
        </Box>
    );
};