import axios from "axios";

export interface Task {
  _id: string;
  user: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export default async function fetchTask(): Promise<{ success: boolean; data: { tasks: Task[] } } | undefined> {
  try {
    const response = await axios.get('http://localhost:5000/api/task/tasks', {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
      throw error.response?.data;
    } else {
      console.error('Unexpected error:', error);
      throw error;
    }
  }
}



