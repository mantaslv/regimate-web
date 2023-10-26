import { Input, Typography } from "@mui/material"
import { useEffect, useState } from "react";

const NamedInput = ({label, value, setVariable}) => {
    const [variableValue, setVariableValue] = useState(value);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        const filteredValue = inputValue.replace(/[^0-9]/g, '').substring(0, 2);
        event.target.value = filteredValue;
        setVariableValue(filteredValue);
        setVariable(filteredValue);
    };

    useEffect(() => setVariableValue(value), [value]);

    return (
        <>
            <Typography 
                variant="h6" 
                fontSize={15} 
                fontWeight={500} 
                textTransform="none" 
                sx={{ color: 'white', mr: -0.5 }}
            >
                {label}
            </Typography>
            <Input
                disableUnderline
                value={variableValue}
                onChange={handleInputChange}
                sx={{
                    m: 1,
                    width: 35,
                    fontSize: 15,
                    color: 'white',
                    borderRadius: '10px',
                    backgroundColor: '#4338CA', 
                    '& input': { textAlign: 'center' },
                    '&:hover': { backgroundColor: '#312E81' },
                }}
            />
        </>
    );
};

const SetsRepsInput = ({ 
    handleSetsRepsChange, 
    initialExerciseData, 
    onInitialSetDataLoad, 
    allInitialDataLoaded 
}) => {
    const [sets, setSets] = useState(1);
    const [reps, setReps] = useState(1);
    const [initialSetDataLoaded, setInitialSetDataLoaded] = useState(false);

    const handleSetsChange = (sets) => {
        setSets(sets);
    };

    const handleRepsChange = (reps) => {
        setReps(reps);
    };

    useEffect(() => {
        handleSetsRepsChange(sets, reps);
    }, [sets, reps]);

    useEffect(() => {
        if (initialExerciseData && !allInitialDataLoaded) {
            setSets(initialExerciseData.sets.length);
            setReps(initialExerciseData.sets[0].reps);
            setInitialSetDataLoaded(true);
        };
    }, [initialExerciseData, allInitialDataLoaded]);

    useEffect(() => {
        if (initialSetDataLoaded) {
            Array.from({ length: sets }, () => onInitialSetDataLoad());
        };
    }, [initialSetDataLoaded]);

    return (
        <>
            <NamedInput label='Sets' setVariable={handleSetsChange} value={sets}/>
            <NamedInput label='Reps' setVariable={handleRepsChange} value={reps}/>
        </>
    );
};

export default SetsRepsInput;