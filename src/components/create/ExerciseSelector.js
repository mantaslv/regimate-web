import { Dialog, DialogContent, DialogTitle, List, ListItemButton, ListItemText, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useProgrammeContext } from "../../hooks/useProgrammeContext";

const ExerciseSelector = ({ 
    openExerciseSelector, 
    onOpenDialog, 
    onExerciseSelection, 
}) => {
    const { state } = useProgrammeContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [exerciseList, setExerciseList] = useState([]);

    useEffect(() => {
        setExerciseList(state.exerciseList);
    }, [state]);

    const filteredExercises = exerciseList.filter(exercise =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCloseDialog = () => {
        onOpenDialog(false);
    };

    const handleExerciseSelection = (exerciseName) => {
        handleCloseDialog();
        onExerciseSelection(exerciseName);
    };

    return(
        <Dialog 
            open={openExerciseSelector} 
            onClose={handleCloseDialog}
            slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } } }}
        >
            <DialogTitle>Select Exercise</DialogTitle>
            <DialogContent>
                <TextField label="Search" value={searchTerm} onChange={handleSearchChange} sx={{ mt: 1 }}/>
                <List>
                    {filteredExercises.map((exercise, i) => 
                        <ListItemButton key={i} onClick={() => handleExerciseSelection(exercise.name)}>
                            <ListItemText primary={exercise.name}/>
                        </ListItemButton>
                    )}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default ExerciseSelector;