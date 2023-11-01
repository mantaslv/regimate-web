import { v4 as uuidv4 } from "uuid";
import { createContext, useReducer } from "react";

export const ProgrammeContext = createContext();

const generateNewWorkout = () => ({
    id: uuidv4(),
    workoutName: "",
    exercises: []
});

const initialState = {
    exerciseList: [],
    programmeName: "",
    workouts: Array.from({ length: 3 }, () => generateNewWorkout())
};

export const programmeReducer = (state, action) => {
    switch (action.type) {
        case "SET_EXERCISE_LIST":
            return {
                ...state,
                exerciseList: action.payload
            };
        case "SET_PROGRAMME":
            return action.payload;
        case "UPDATE_PROGRAMME_NAME":
            return {
                ...state,
                programmeName: action.payload
            };
        case "ADD_WORKOUT":
            return {
                ...state,
                workouts: [
                    ...state.workouts, 
                    generateNewWorkout()
                ]
            };
        case "UPDATE_WORKOUT_NAME":
            return {
                ...state,
                workouts: state.workouts.map((workout) => 
                    workout.id === action.payload.id ? { ...workout, workoutName: action.payload.newName} : workout
                )
            };
            case "ADD_EXERCISE":
                return {
                    ...state,
                    workouts: state.workouts.map((workout) =>
                        workout.id === action.payload.id
                            ? {
                                ...workout,
                                exercises: [
                                    ...workout.exercises,
                                    {
                                        id: uuidv4(),
                                        exerciseName: action.payload.exerciseName,
                                        sets: [{ reps: "", weight: "" }]
                                    }
                                ]
                            }
                            : workout
                    )
                };
        case "DELETE_WORKOUT":
            return {
                ...state,
                workouts: state.workouts.filter((workout) => workout.id !== action.payload)
            };
        default:
            return state;
    };
};

export const ProgrammeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(programmeReducer, initialState);

    return (
        <ProgrammeContext.Provider value={{ state, dispatch }}>
            {children}
        </ProgrammeContext.Provider>
    );
};