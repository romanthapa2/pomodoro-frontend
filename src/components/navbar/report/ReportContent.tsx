import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import fetchTask, { Task } from "./FetchTak";
import  Details  from "./Details";
import Cookies from "js-cookie";

const ReportContent = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState("Summery");

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === "Details" && Cookies.get("accessToken") !== undefined) {
        try {
          const response = await fetchTask();
          if (response && response.success) {
            setTasks(response.data.tasks);
          }
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }
    };
    fetchData();
  }, [activeTab]);

  return (
    <Tabs defaultValue="Summery" className="w-auto" onValueChange={setActiveTab}>
      <TabsList className="flex justify-evenly items-center">
        <TabsTrigger value="Summery" className="w-1/2">
          Summery
        </TabsTrigger>
        <TabsTrigger value="Details" className="w-1/2">
          Details
        </TabsTrigger>
      </TabsList>
      <TabsContent value="Summery" className="w-full">
        {/* Summary content will go here */}
      </TabsContent>
      <TabsContent value="Details" className="h-96 w-auto">
        <header className="my-5 font-semibold">Focus Time Details</header>
        <div className="flex flex-row space-x-24 list-none border-b py-2">
          <li>DATE</li>
          <li>TASK</li>
          <li>STATUS</li>
        </div>
        {tasks.length > 0 ? (
          tasks.map((task) => <Details task={task} key={task._id} />)
        ) : (
          <p>No tasks available</p>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ReportContent;
