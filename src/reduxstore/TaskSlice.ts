import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./Store";

export interface Task {
  _id?: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: Date;
  sessions?: string[];
  setTaskNo?: number;
  completedTaskNo?: number;
}

interface TaskState {
  tasks: Task[];
  selectedTaskIndex: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  selectedTaskIndex: null,
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      console.log("action.payload",action.payload)
      if (!state.tasks) {
        state.tasks = [];
      }
      state.tasks.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    updateTask: (state, action: PayloadAction<{ index: number; task: Task }>) => {
      const { index, task } = action.payload;
      state.tasks[index] = task;
      state.loading = false;
      state.error = null;
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.tasks = [...state.tasks.slice(0, index), ...state.tasks.slice(index + 1)];
      state.loading = false;
      state.error = null;
    },
    clearTasks: (state) => {
      state.tasks = [];
      state.selectedTaskIndex = null;
      state.loading = false;
      state.error = null;
    },
    selectTask: (state, action: PayloadAction<number>) => {
      state.selectedTaskIndex = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { 
  addTask,
  updateTask,
  deleteTask,
  clearTasks,
  selectTask,
  setLoading,
  setError
} = taskSlice.actions;

export const selectTasks = (state: RootState) => state.taskSlice.tasks;
export const selectSelectedTaskIndex = (state: RootState) => state.taskSlice.selectedTaskIndex;
export const selectTaskLoading = (state: RootState) => state.taskSlice.loading;
export const selectTaskError = (state: RootState) => state.taskSlice.error;

export default taskSlice.reducer;
