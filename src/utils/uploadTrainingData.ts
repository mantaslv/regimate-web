import { ProgrammeType, WorkoutType } from "../types";

type TrainingDataType = "programmes" | "workouts";
type DataToSave = WorkoutType | ProgrammeType;

interface UploadTrainingDataParams {
    token: string;
    onComplete: () => void;
    dataToSave: DataToSave;
    dataType: TrainingDataType;
}

const uploadTrainingData = async ({ 
	token, 
	onComplete, 
	dataToSave,
	dataType
}: UploadTrainingDataParams): Promise<void> => {
	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/api/${dataType}`, {
			method: "POST",
			body: JSON.stringify(dataToSave),
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			}
		});

		const json = await res.json();
    
		if (res.ok) {
			console.log(json);
			onComplete();
		} else {
			throw new Error(`Error sending ${dataType}: ${JSON.stringify(json)}`);
		}
	} catch (error) {
		console.error(`Error sending ${dataType}: `, error);
	}
};

export default uploadTrainingData;