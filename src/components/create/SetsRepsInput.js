import { Input, Typography } from "@mui/material"
import { useEffect, useState } from "react";

const SetsRepsInput = ({ handleSetsRepsChange, initialExerciseData }) => {
    const[sets, setSets] = useState(1);
    const[reps, setReps] = useState(1);

    const handleSetsInputChange = (event) => {
        const inputValue = event.target.value;
        const filteredValue = inputValue.replace(/[^0-9]/g, '').substring(0, 2);
        event.target.value = filteredValue;
        setSets(filteredValue);
    };

    const handleRepsInputChange = (event) => {
        const inputValue = event.target.value;
        const filteredValue = inputValue.replace(/[^0-9]/g, '').substring(0, 2);
        event.target.value = filteredValue;
        setReps(filteredValue);
    };

    useEffect(() => {
        handleSetsRepsChange(sets, reps);
    }, [sets, reps]);

    useEffect(() => {
        if (initialExerciseData) {
            setSets(initialExerciseData.sets.length);
            setReps(initialExerciseData.sets[0].reps)
        };
    });

    return (
        <>
            <Typography 
                variant="h6" 
                fontSize={15} 
                fontWeight={500} 
                textTransform="none" 
                sx={{ color: 'white', mr: -0.5 }}
            >
                Sets
            </Typography>
            <Input
                disableUnderline
                value={sets}
                onChange={handleSetsInputChange}
                sx={{
                    m: 1,
                    width: 35,
                    fontSize: 15,
                    color: 'white',
                    borderRadius: '10px',
                    backgroundColor: '#007368', 
                    '& input': { textAlign: 'center' },
                    '&:hover': { backgroundColor: '#008579' },
                }}
            />
            <Typography 
                variant="h6" 
                fontSize={15} 
                fontWeight={500} 
                textTransform="none" 
                sx={{ color: 'white', mr: -0.5 }}
            >
                Reps
            </Typography>
            <Input
                disableUnderline
                value={reps}
                onChange={handleRepsInputChange}
                sx={{
                    m: 1,
                    width: 35,
                    fontSize: 15,
                    color: 'white', 
                    borderRadius: '10px',
                    backgroundColor: '#007368', 
                    '& input': { textAlign: 'center' },
                    '&:hover': { backgroundColor: '#008579' },
                }}
            />
        </>
    );
};

export default SetsRepsInput;