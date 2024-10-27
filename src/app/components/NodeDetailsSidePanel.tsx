/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { NodeType } from "../types";
import { RewardChart } from ".";
import { HistoryList } from "./index";

interface NodeDetailsSidePanelProps {
  node?: NodeType;
  graphData: any;
}

const NodeDetailsSidePanel: React.FC<NodeDetailsSidePanelProps> = ({
  node,
  graphData,
}) => {
  return (
    <div className="flex flex-col h-fit px-10 gap-y-5">
      <div className="flex flex-row bg-zinc-900 rounded-xl py-2 px-5">
        {node?.address}
      </div>
      <div className="mb-16" style={{ marginLeft: "-30px" }}>
        <RewardChart graphData={graphData} width={800} />
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

      <div className="flex flex-col px-5 justify-start">
        <div className="flex flex-row gap-5 mb-5 font-bold text-xl left-5 text-yellow-500">
          <div>Past Contributions</div>
        </div>

        <HistoryList
          historyList={
            node
              ? node.history
              : [{ taskId: 0, action: "", rewardReceived: 0, name: "" }]
          }
        />
      </div>
    </div>
  );
};

export default NodeDetailsSidePanel;
