import "jest";
import "@testing-library/jest-dom";
import React from "react";
import { act } from "react-dom/test-utils";
import { useLocation, useNavigate } from "react-router-dom";
import { screen, render, fireEvent, waitFor, within } from "@testing-library/react";
import TrainingEditor from "../components/training-create/TrainingEditor";
import { WorkoutContextProvider } from "../context/workoutContext";
import { AuthContextProvider } from "../context/authContext";
import { changeInputValue, clickButton, getState } from "../utils/testHelper";

jest.mock("react-router-dom", () => ({ 
	useLocation: jest.fn(),
	useNavigate: jest.fn()
}));

describe("Workout Editor", () => {
	let mockNavigate;

	beforeEach(() => {
		useLocation.mockReturnValue({});

		mockNavigate = jest.fn();
		useNavigate.mockReturnValue(mockNavigate);

		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve([
					{ name: "Front Squats" }, 
					{ name: "Back Squats" }
				]),
			})
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("Integration Test: Creating new workout and editing fields updates context state", async () => {
		render(
			<AuthContextProvider>
				<WorkoutContextProvider testState>
					<TrainingEditor isWorkout/>
				</WorkoutContextProvider>
			</AuthContextProvider>
		);

		await waitFor(() => {
			expect(getState().exercises.length).toEqual(0);
		});
		
		await act(async () => {
			await changeInputValue("training-name-input", "Leg Day");
			clickButton("add-exercise-btn");
		});

		await waitFor(() => {
			expect(getState().workoutName).toEqual("Leg Day");
			expect(screen.getByText("Select Exercise")).toBeInTheDocument();
		});

		await act(async () => {
			fireEvent.click(await screen.findByText("Front Squats"));
		});

		await waitFor(() => {
			expect(screen.getByText("Front Squats")).toBeInTheDocument();
			expect(getState().exercises.length).toEqual(1);
		});

		await act(async () => {
			await changeInputValue("weight-input", "50");
			await changeInputValue("reps-input", "10");
		});
		
		await waitFor(() => {
			expect(getState().exercises.length).toEqual(1);
			expect(getState().exercises[0].sets.length).toEqual(1);
			expect(getState().exercises[0].sets[0]).toEqual(expect.objectContaining({ weight: "50", reps: "10" }));
			expect(getState().exercises[0]).toEqual(expect.objectContaining({ exerciseName: "Front Squats" }));
			expect(getState().workoutName).toEqual("Leg Day");
		});
		
		await act(async () => {
			clickButton("add-set-btn");
		});
		
		let setElements;
		await waitFor(async () => {
			setElements = await screen.findAllByLabelText("set-element");
			expect(setElements.length).toEqual(2);
		});

		await act(async () => {
			await changeInputValue("weight-input", "55", 1);
			await changeInputValue("reps-input", "8", 1);
		});

		await waitFor(() => {
			expect(getState().exercises[0].sets.length).toEqual(2);
			expect(getState().exercises[0].sets[1]).toEqual(expect.objectContaining({ weight: "55", reps: "8" }));
		});
		
		await act(async () => clickButton("delete-set-btn"));

		await waitFor(async () => {
			setElements = await screen.findAllByLabelText("set-element");
			expect(setElements.length).toEqual(1);
			expect(getState().exercises[0].sets.length).toEqual(1);
			expect(getState().exercises[0].sets[0]).toEqual(expect.objectContaining({ weight: "55", reps: "8" }));
		});
		
		act(() => clickButton("add-exercise-btn"));

		await waitFor(() => {
			expect(screen.getByText("Select Exercise")).toBeInTheDocument();
		});

		await act(async () => {
			fireEvent.click(await screen.findByText("Back Squats"));
		});

		let exerciseCardElements;
		await waitFor(async () => {
			exerciseCardElements = await screen.findAllByLabelText("exercise-card");
			expect(exerciseCardElements.length).toEqual(2);
			expect(screen.getByText("Back Squats")).toBeInTheDocument();
			expect(getState().exercises.length).toEqual(2);
		});

		await act(async () => {
			const withinCard = within(exerciseCardElements[1]);
			await changeInputValue("weight-input", "20", 0, withinCard);
			await changeInputValue("reps-input", "10", 0, withinCard);
		});
		
		await waitFor(() => {
			expect(getState().exercises.length).toEqual(2);
			expect(getState().exercises[1].sets.length).toEqual(1);
			expect(getState().exercises[1]).toEqual(expect.objectContaining({ exerciseName: "Back Squats" }));
			expect(getState().exercises[1].sets[0]).toEqual(expect.objectContaining({ weight: "20", reps: "10" }));
		});

		act(() => clickButton("delete-exercise-btn"));

		await waitFor(() => {
			expect(getState().exercises.length).toEqual(1);
			expect(getState().exercises[0].sets[0]).toEqual(expect.objectContaining({ weight: "20", reps: "10" }));
		});
	});
});