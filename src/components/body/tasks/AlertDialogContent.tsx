import { useState,useEffect } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppDispatch } from "@/reduxstore/AppHooks";
import { addTask, updateTask, deleteTask } from "@/reduxstore/TaskSlice";
import type { Task } from "@/reduxstore/TaskSlice";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface props {
  button: ReactNode;
  index?: number;
  initialTask?: Task;
  onClose: () => void;
}

// when i click the add or edit button this component will show up
const AlertDialogContent = ({ button, index, initialTask, onClose }: props) => {
  console.log("index",index)
  const dispatch = useAppDispatch();
  const [task, setTask] = useState<Task>({ 
    title: "", 
    description: "",
    completed: false,
    setTaskNo: 1,
    completedTaskNo: 0 
  });

  useEffect(() => {
    if (initialTask) {
      setTask(initialTask);
    }
  }, [initialTask]);

  const handleIncrease = () => {
    setTask((prevTask) => ({ 
      ...prevTask, 
      setTaskNo: (prevTask.setTaskNo || 1) + 1 
    }));
  };

  const handleDecrease = () => {
    if ((task.setTaskNo || 1) >= 2) {
      setTask((prevTask) => ({ 
        ...prevTask, 
        setTaskNo: (prevTask.setTaskNo || 1) - 1 
      }));
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prevTask) => ({ ...prevTask, title: e.target.value }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.title.length >= 2) {
      
      if (index !== undefined) {
        console.log("index",index)
        
        dispatch(updateTask({ index, task }));
      } else {
        dispatch(addTask(task));
      }
      onClose();
    }
  };

  const handleDeleteTask = () => {
    if (index !== undefined) {
      dispatch(deleteTask(index));
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* if not having title and description it throws error so i am putting this two line of code */}
      <VisuallyHidden>
        <AlertDialogTitle>Dialog Title</AlertDialogTitle>
        <AlertDialogDescription>Description of the dialog content</AlertDialogDescription>
      </VisuallyHidden>
      <input
        className="focus:outline-none focus:border-none text-2xl"
        type="text"
        autoFocus
        onChange={onChange}
        value={task.title}
        placeholder="What are you working on?"
      />
      <h2 className="font-medium">Estimated Pomodoros</h2>
      <div className="flex flex-row">
        <h3 className="bg-slate-300 w-20 px-2 py-1 text-lg rounded">{task.setTaskNo || 1}</h3>

        <button type="button" className="mx-4 border px-2 py-1 text-lg rounded" onClick={handleIncrease}>
          up
        </button>
        <button type="button" className="border px-2 py-1 text-lg rounded" onClick={handleDecrease}>
          down
        </button>
      </div>
      <AlertDialogFooter>
        {typeof button === "object" && <Button type="button" onClick={handleDeleteTask}>Delete</Button>}
        <AlertDialogCancel type="button" onClick={onClose}>Cancel</AlertDialogCancel>
        <AlertDialogAction type="submit">Continue</AlertDialogAction>
      </AlertDialogFooter>
    </form>
  );
};

export default AlertDialogContent;
