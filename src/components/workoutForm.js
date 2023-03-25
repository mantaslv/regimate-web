import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import apiUrl from "../api";

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return
        };

        const workout = {title, load, sets, reps};

        const res = await fetch(apiUrl + '/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await res.json();

        if (!res.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        };
        if (res.ok) {
            setTitle('');
            setLoad('');
            setSets('');
            setReps('');
            setError(null);
            setEmptyFields([]);
            console.log("new workout added!");
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        };
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>Exercise Title:</label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)} 
                value={title} 
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (in kg):</label>
            <input 
                type="number" 
                onChange={(e) => setLoad(e.target.value)} 
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Sets:</label>
            <input 
                type="number" 
                onChange={(e) => setSets(e.target.value)} 
                value={sets}
                className={emptyFields.includes('sets') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input 
                type="number" 
                onChange={(e) => setReps(e.target.value)} 
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
};

export default WorkoutForm;