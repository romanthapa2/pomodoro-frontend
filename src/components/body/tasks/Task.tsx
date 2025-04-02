import { AlertDialogDemo } from "./AlertDialog";
import { useSelector } from "react-redux";
import { selectTasks, clearTasks, selectTask, selectSelectedTaskIndex } from "@/reduxstore/TaskSlice";
import type { Task } from "@/reduxstore/TaskSlice";
import TaskCard from "./TaskCard";
import { PiDotsThreeOutlineVerticalThin } from "react-icons/pi";
import { useAppDispatch } from "@/reduxstore/AppHooks";
import { useEffect } from "react";

const Task: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleClearTask = () => {
    dispatch(clearTasks());
  };

  const selectedTaskIndex = useSelector(selectSelectedTaskIndex);
  const tasks = useSelector(selectTasks);

  const handleTaskClick = (index: number) => {
    dispatch(selectTask(index));
  };

  useEffect(() => {
    if (tasks && tasks.length > 0 && selectedTaskIndex === null) {
      dispatch(selectTask(0));
    }
  }, [tasks]);

  return (
    <>
      <div className="h-full mx-2 md:mx-[33%] flex flex-col justify-start items-center mt-8 px-3">
        <div className="flex flex-row w-full items-center justify-between">
          <div className="mb-5 mt-5 text-white text-xl">Tasks</div>
          <PiDotsThreeOutlineVerticalThin
            onClick={handleClearTask}
            className="bg-slate-300 text-xl p-2 h-10 w-8 rounded-md"
          />
        </div>
        <div className="w-full flex flex-col justify-center">
          {tasks && tasks.map((task, index) => (
            <TaskCard
              task={task}
              key={index}
              index={index}
              isSelected={index === selectedTaskIndex}
              onClick={() => handleTaskClick(index)}
            />
          ))}
        </div>
        <AlertDialogDemo
          className="w-full h-14 my-6 bg-white rounded-lg"
          button="ADD Task"
        />
      </div>
    </>
  );
};

export default Task;
