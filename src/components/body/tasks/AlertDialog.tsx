import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AlertContent from "./AlertDialogContent";
import { ReactNode, useState } from "react";
import type { Task } from "@/reduxstore/TaskSlice";

interface props {
  button: ReactNode;
  className: string;
  index?: number;
  initialTask?: Task;
}

export function AlertDialogDemo({
  button,
  className,
  index,
  initialTask,
}: props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button 
          className={className}
          onClick={() => setIsOpen(true)}
        >
          {button}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertContent
          button={button}
          index={index}
          initialTask={initialTask}
          onClose={handleClose}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}
