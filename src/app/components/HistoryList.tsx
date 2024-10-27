/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { History } from "../types";

interface HistoryProps {
  historyList: History[];
}

export const HistoryList: React.FC<HistoryProps> = ({ historyList }) => {
  const completedSign = (
    <span className="w-3 h-3 bg-green-600 rounded-full"></span>
  );
  const onGoingSign = (
    <span className="w-3 h-3 bg-orange-600 rounded-full"></span>
  );
  return (
    <div className="flex flex-row w-full">
      <div className="grid w-full grid-cols-4 backdrop-blur-md bg-zinc-800 rounded-xl">
        <div className="col-span-4 grid grid-cols-4 justify-center items-center text-center w-full font-bold backdrop-blur-md bg-zinc-700 rounded-xl">
          <div>Task ID</div>
          <div>Name</div>
          <div>Reward Received</div>
          <div>Status</div>
        </div>
        <div className="col-span-4 gap-5 grid grid-cols-4 mb-5 overscroll-contain">
          {historyList.map((history, index) => {
            return (
              <div
                key={index}
                className="flex col-span-4 w-full grid grid-cols-4 justify-center items-center text-center space-x-2"
              >
                <div>{history.taskId}</div>
                <div>{history.name}</div>
                <div>{history.rewardReceived}</div>
                <div>
                  <div
                    className={
                      history.action === "Claimer"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }
                  >
                    {history.action}
                  </div>
                  <div></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HistoryList;
