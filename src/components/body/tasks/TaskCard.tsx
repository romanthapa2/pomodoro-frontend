import { AlertDialogDemo } from "./AlertDialog";
import { PiDotsThreeOutlineVerticalThin } from "react-icons/pi";
import type { Task } from "@/reduxstore/TaskSlice";

interface taskCardProp {
  task: Task;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

const TaskCard: React.FC<taskCardProp> = ({
  task,
  index,
  isSelected,
  onClick,
}) => {
  const backgroundColor = isSelected ? "bg-red-500" : "bg-gray-700";
  return (
    <div
      className={`flex my-1 text-white bg-gray-500 ${backgroundColor} items-center justify-between h-14 px-7 rounded-md`}
      onClick={onClick}
    >
      <h3 className="">{task.title}</h3>
      <div className="flex justify-center items-center gap-5">
        <h3 className="">{task.completedTaskNo || 0} / {task.setTaskNo || 1}</h3>
        <AlertDialogDemo
          className="bg-inherit hover:bg-transparent p-2 "
          button={<PiDotsThreeOutlineVerticalThin />}
          index={index}
          initialTask={task}
        />
      </div>
    </div>
  );
};

export default TaskCard;
