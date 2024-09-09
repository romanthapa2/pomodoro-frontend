import axios from "axios";

export default async function fetchTask(){
    try {
      const response = await axios.get('http://localhost:5000/api/task/task',{
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
}



