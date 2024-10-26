import React from "react";
import { NodeType } from "../types";
import { RewardChart } from ".";

interface NodeDetailsSidePanelProps {
  node?: NodeType;
}

const NodeDetailsSidePanel: React.FC<NodeDetailsSidePanelProps> = ({
  node,
}) => {
  return (
    <div className="flex flex-col h-fit px-10 gap-y-5">
      <div className="flex flex-row bg-zinc-900 rounded-xl py-2 px-5">
        {node?.address}
      </div>
      <div className="mb-16" style={{ marginLeft: "-40px" }}>
        <RewardChart />
      </div>

      <div className="flex flex-row justify-between h-fit w-full">
        <div className="additional-info-cell">
          Tasked Contributed: {node?.taskContributed}
        </div>
        <div className="additional-info-cell">
          Reward Received: {node?.rewardReceived}
        </div>
        <div className="additional-info-cell">
          Delegated Coins: {node?.delegatedCoins}
        </div>
      </div>

      <div className="flex flex-col px-5">
        <div className="flex flex-row justify-between">
          <div>History</div>
          <div>Actions</div>
        </div>
        <div className="flex flex-col">
          {node?.history.map((hist, index) => {
            return (
              <div key={index} className="">
                <div>faker</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NodeDetailsSidePanel;
