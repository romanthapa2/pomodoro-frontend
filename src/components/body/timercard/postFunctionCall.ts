import axios from 'axios';

interface Task {
  title: string;
  description?: string;
  completed?: boolean;
}

// axios.defaults.withCredentials = true;

export default async function createTask(taskData: Task) {
  try {
    const response = await axios.post('http://localhost:5000/api/task/tasks', taskData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
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
