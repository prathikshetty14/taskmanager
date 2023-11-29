import { createSlice } from "@reduxjs/toolkit";

// Empty Array to be stored in the localStorage
const tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];

// InitialState for createSlice
const initialState = {
    tasks: tasksArray,
    completed: false
}

// Reducers in CreateSlice
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // Add Task
        addTask: (state, action) => {
            state.tasks.push(action.payload);
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        },
        
        // Delete Task
        deleteTask: (state, action) => {
            const taskIdToDelete = Number(action.payload);
            const updatedTasks = state.tasks.filter((task) => task.id !== taskIdToDelete);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            state.tasks = updatedTasks;
        },
    
        // Edit Task
        updateTask: (state, action) => {
            const { id, updatedTask } = action.payload;
            state.tasks = state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
            );
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
    },
});


export const taskReducer = tasksSlice.reducer;

export const {
    addTask,
    deleteTask,
    updateTask,
} = tasksSlice.actions;

export const taskSelector = (state) => state.taskReducer