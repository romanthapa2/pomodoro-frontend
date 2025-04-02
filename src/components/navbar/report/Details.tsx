import { Task } from "./FetchTak";

interface DetailsProps {
  task: Task;
}

const Details: React.FC<DetailsProps> = ({ task }) => {
  return (
    <div className="flex flex-row space-x-24 list-none border-b py-2">
      <li>{new Date(task.createdAt).toLocaleDateString()}</li>
      <li>{task.title}</li>
      <li>{task.completed ? "Completed" : "In Progress"}</li>
    </div>
  );
};

export default Details;
