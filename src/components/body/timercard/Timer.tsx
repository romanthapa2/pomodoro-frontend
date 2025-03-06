import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectPomodoroTime,
  selectLongBreak,
  selectShortBreak,
} from "../../../reduxstore/TimeSlice";
import useTimer from "./UseTimer";
import { Button } from "@/components/ui/button";
import AudioPlayer from "./AudioPlayer";
import TimerDisplay from "./TimerDisplay";

const Timer: React.FC = () => {
  const pomodoroTime = useSelector(selectPomodoroTime);
  const shortBreakTime = useSelector(selectShortBreak);
  const longBreakTime = useSelector(selectLongBreak);

  const handleTimerEnd = () => {
    if (activeButton === "Pomodoro") {
      setActiveButton("Short Break");
    }
  };

  const { time, status, startPauseTimer, resetTimer, audioRef } = useTimer(
    pomodoroTime,
    handleTimerEnd
  );

  const [activeButton, setActiveButton] = useState<
    "Pomodoro" | "Short Break" | "Long Break"
  >("Pomodoro");

  const buttonConfigs = {
    "Pomodoro": pomodoroTime,
    "Short Break": shortBreakTime,
    "Long Break": longBreakTime,
  } as const;

  useEffect(() => {
    const activeTime = buttonConfigs[activeButton];
    resetTimer(activeTime);
  }, [pomodoroTime, shortBreakTime, longBreakTime, activeButton]);

  const handleButtonClick = (label: keyof typeof buttonConfigs) => {
    setActiveButton(label);
  };

  return (
    <div className="text-white bg-gray-500 h-fit mx-2 mt-10 md:mx-[34%] rounded-md">
      <div className="p-5 space-y-4">
        <div className="flex justify-center items-center gap-2">
          {Object.keys(buttonConfigs).map((label) => (
            <Button
              key={label}
              onClick={() =>
                handleButtonClick(label as keyof typeof buttonConfigs)
              }
              className={`min-h-10 w-28  rounded-md p-5  ${
                activeButton === label ? "bg-gray-700" : "bg-gray-500"
              }`}
            >
              {label}
            </Button>
          ))}
        </div>

        <TimerDisplay time={time} />
        
        <div className="h-fit w-full flex justify-center items-center">
          <button
            onClick={startPauseTimer}
            className="px-10 py-5 text-gray-700 bg-white font-medium h-14 w-48 text-2xl rounded-lg flex justify-center items-center"
          >
            {status === "Pause" ? "START" : "PAUSE"}
          </button>
        </div>
      </div>
      <AudioPlayer audioRef={audioRef} />
    </div>
  );
};

export default Timer;
