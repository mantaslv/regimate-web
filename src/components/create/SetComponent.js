import { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { useSetContext } from "../../hooks/useSetContext";
import { useExerciseContext } from "../../hooks/useExerciseContext";
import ConsoleLogButton from "../ConsoleLogButton";

const Set = ({ onSetChange, onSetDelete, initialSetData }) => {
    const { state: exerciseState } = useExerciseContext();
    const { state, dispatch } = useSetContext();
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);

    useEffect(() => {
        if (initialSetData) {
            setReps(initialSetData.reps);
            setWeight(initialSetData.weight);
            dispatch({ type: "SET_SET", payload: initialSetData });
        };
    }, [initialSetData]);

    const handleWeightChange = (event) => {
        const newWeight = event.target.value;
        setWeight(newWeight);
        dispatch({ type: "SET_WEIGHT", payload: newWeight });
    };

    const handleRepsChange = (event) => {
        const newReps = event.target.value;
        setReps(newReps);
        dispatch({ type: "SET_REPS", payload: newReps });
    };

    useEffect(() => {
        onSetChange(state);
    }, [state])

    const handleDeleteSet = () => {
        onSetDelete();
    };

    return (
            <Grid container spacing={2} paddingY={1} alignItems="center">
                <Grid item>
                    <TextField
                        label="Weight (kg)" 
                        name="weight"
                        value={weight}
                        onChange={handleWeightChange}
                    />
                </Grid>
                <Grid item>
                    <TextField 
                        label="Reps" 
                        name="reps"
                        value={reps}
                        onChange={handleRepsChange}
                    />
                </Grid>
                <Grid item md={1}>
                    <Button 
                        variant="contained" 
                        color="error" 
                        onClick={handleDeleteSet}
                        disabled={exerciseState.sets.length <= 1}
                        aria-label="Delete Set"
                        title="Click to remove this set"
                    ><RemoveCircleIcon/></Button>
                </Grid>
                <Grid item md={1}>
                    <ConsoleLogButton print={state} info="set"/>
                </Grid>
            </Grid>
    );
};

export default Set;