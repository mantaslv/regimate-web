import { createContext, useReducer } from "react";

export const ExerciseContext = createContext();

const emptySet = { weight: "", reps: "" };

const initialState = { exerciseName: "", sets: [emptySet] };

export const exerciseReducer = (state, action) => {
    switch (action.type) {
        case "ADD_SET":
            return {
                ...state,
                sets: [...state.sets, emptySet]
            };
        case "SET_EXERCISE":
            return action.payload;
        case "SET_EXERCISE_NAME":
            return {
                ...state,
                exerciseName: action.payload.value
            }
        case "UPDATE_SET":
            return {
                ...state,
                sets: state.sets.map((set, index) =>
                    index === action.payload.index
                        ? { ...set, ...action.payload.set }
                        : set
                )
            };
        case "REMOVE_SET":
            return {
                ...state,
                sets: state.sets.filter((set, index) => index !== action.payload)
            };
        default:
            return state;
    }
};

export const ExerciseContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
        exerciseReducer,
        initialState
    );

    return (
        <ExerciseContext.Provider value={{ state, dispatch }}>
            {children}
        </ExerciseContext.Provider>
    );
};
