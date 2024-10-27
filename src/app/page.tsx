"use client";
import React, { useEffect, useState } from "react";
import {
  Header,
  RadioButtonGroup,
  NodeDetailsSidePanel,
  Tooltip,
} from "./components";
import { NodeType, Tabs } from "./types";
import { RewardChart } from "./components";
import { Area } from "recharts";
import data from "./aggregated.json";

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<NodeType>();
  const [nodes, setNodes] = useState<NodeType[]>();
  const [currentlySelectedTab, setCurrentlySelectedTab] = useState<Tabs>({
    tab: "TRAINER",
  });
  const [currentSortKey, setCurrentSortKey] = useState<keyof NodeType>("rank");
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [tooltipClipboardContent, setTooltipClipboardContent] =
    useState<string>(DEFAULT_CLIPBOARD_TOOLTIP);
  const [mainGraphData, setMainGraphData] = useState<any[]>([]);
  const [detailsGraphData, setDetailsGraphData] = useState<any[]>([]);

  const cumSum = (arr: number[]) => {
    return arr.reduce((acc: number[], num, i) => {
      if (i === 0) {
        acc.push(num);
      } else {
        acc.push(num + acc[i - 1]);
      }
      return acc;
    }, []);
  };

  useEffect(() => {
    parseData(data);
    if (currentlySelectedTab.tab === "TRAINER") {
      setNodes(TRAINER_NODES);
      setSelectedNode(TRAINER_NODES[0]);
    } else {
      setNodes(VALIDATOR_NODES);
      setSelectedNode(VALIDATOR_NODES[0]);
    }
    handleSort(currentSortKey);

    const nums1 = [0].concat(
      Array.from({ length: 365 }, (_, i) => Math.exp(Math.random() * 25))
    );
    const nums2 = [0].concat(
      Array.from({ length: 365 }, (_, i) => Math.exp(Math.random() * 25))
    );

    setDetailsGraphData(
      cumSum(nums1).map((i) => ({
        name: (i + 1).toString(),
        value: i,
      }))
    );

    setMainGraphData(
      cumSum(nums2).map((i, idx) => ({
        name: (i + 1).toString(),
        value: cumSum(nums1)[idx],
        secondary: i,
      }))
    );
  }, [currentlySelectedTab, currentSortKey]);

  const radioButtonsHandler = (buttonId: Tabs) => {
    setCurrentlySelectedTab(buttonId);
    setSortAsc(false);
    setCurrentSortKey("rank");
  };
  const handleSort = (sortKey: keyof NodeType) => {
    if (currentSortKey === sortKey) {
      setSortAsc((prevSortAsc) => !prevSortAsc);
    } else {
      setCurrentSortKey(sortKey);
      setSortAsc(false);
    }
    nodes?.sort((a: NodeType, b: NodeType) => {
      if (sortAsc) {
        return (b[sortKey] as number) - (a[sortKey] as number);
      } else {
        return (a[sortKey] as number) - (b[sortKey] as number);
      }
    });
  };

  const parseNodeData = (nodeData: any, address: string, rank: number) => {
    let trainer = false;
    let validator = false;
    const parsedNode: NodeType = {
      name: address,
      address: address,
      rank: rank,
      history: [],
      taskContributed: 0,
      rewardReceived: 0,
      delegatedCoins: 0,
    };

    nodeData.forEach((task: any, index: number) => {
      const [date, taskType, rewardType, reward, meta] = task;

      const roundedReward = Math.round(parseFloat(reward) * 1000) / 1000;

      parsedNode.history.push({
        taskId: parseInt(meta["task_id"]),
        action: rewardType === "Reward" ? "Claimer" : "Delegator",
        rewardReceived: roundedReward,
        name: meta["name"],
      });

      parsedNode.name = meta["name"];

      parsedNode.taskContributed += 1;
      if (rewardType === "Reward") {
        parsedNode.rewardReceived += roundedReward;
      }

      if (rewardType === "Delegate") {
        parsedNode.delegatedCoins += roundedReward;
      }

      if (taskType === "Valid") {
        validator = true;
      }

      if (taskType === "Train") {
        trainer = true;
      }
    });

    parsedNode.rewardReceived = parseFloat(
      parsedNode.rewardReceived.toFixed(3)
    );

    return [parsedNode, trainer, validator];
  };

  const parseData = (data: any) => {
    const dat = data["nodes"];
    TRAINER_NODES = [];
    VALIDATOR_NODES = [];

    Object.entries(dat).forEach(([address, task], index) => {
      const [parsedNode, trainer, validator] = parseNodeData(
        dat[address],
        address,
        index + 1
      );

      if (trainer) {
        TRAINER_NODES.push(parsedNode as NodeType);
      }
      if (validator) {
        VALIDATOR_NODES.push(parsedNode as NodeType);
      }
    });
  };

  return (
    <div className="flex flex-col max-h-screen bg-zinc-900 px-5 overflow-x-hidden overflow-y-scroll">
      <Header />
      <div style={{ marginLeft: "-40px" }} className="mb-20 mt-5">
        <RewardChart graphData={mainGraphData} width={1550} secondary={true} />
      </div>
      <div className="flex justify-center w-full my-5">
        <RadioButtonGroup
          buttonsConfig={BUTTON_CONFIG}
          handler={radioButtonsHandler}
          initTab={currentlySelectedTab}
        />
      </div>

      <div className="flex h-[1200px] pb-10 flex-row my-5 border-t-2 rounded-xl pt-10 bg-gradient-to-t from-zinc-800 to-zinc-950">
        <div className="h-full grid grid-cols-5 gap-y-5 m-2 px-5">
          {TABLE_HEADERS.map((header, index) => {
            return (
              <div
                key={index}
                className={`flex node-table-cell justify-center items-center text-center ${
                  header.filter ? "filterable cursor-pointer" : ""
                } rounded-lg font-bold`}
                onClick={() => {
                  if (header.filter) {
                    handleSort(header.key as keyof NodeType);
                  }
                }}
              >
                {header.name}{" "}
                {header.key === currentSortKey ? (sortAsc ? "↑" : "↓") : ""}
              </div>
            );
          })}
          <div className="col-span-5 h-full p-5 grid grid-cols-5 gap-y-5 overflow-x-hidden overflow-y-scroll overscroll-contain">
            {nodes
              ? nodes.map((node, index) => {
                  return (
                    <div
                      key={index}
                      className={`col-span-5 min-h-16 max-h-16 text-FlockWhite grid grid-cols-5 hover:bg-yellow-500
                         hover:text-yellow-500 hover:bg-opacity-50 bg-zinc-800 py-2 text-center justify-center items-center rounded-xl cursor-pointer`}
                      onClick={() => setSelectedNode(node)}
                    >
                      <div className="node-table-cell">{node.rank}</div>
                      <div className="node-table-cell flex hover:bg:zinc-500 flex-row w-32 ">
                        <div
                          className="w-fit overflow-hidden overflow-ellipsis whitespace-nowrap hover:bg-zinc-500 hover:rounded-lg cursor-pointer hover:text-FlockBlue max-h-full"
                          onClick={() => {
                            navigator.clipboard.writeText(node.address);
                            setTooltipClipboardContent("Copied!");
                            setTimeout(
                              () =>
                                setTooltipClipboardContent(
                                  DEFAULT_CLIPBOARD_TOOLTIP
                                ),
                              2000
                            );
                          }}
                          onMouseEnter={() => setTooltipVisible(true)}
                          onMouseLeave={() => setTooltipVisible(false)}
                        >
                          {node.address}
                        </div>
                        <div className="w-fit justify-center"></div>
                      </div>
                      <div className="node-table-cell">
                        {node.taskContributed}
                      </div>
                      <div className="node-table-cell">
                        {node.rewardReceived}
                      </div>
                      <div className="node-table-cell">
                        {node.delegatedCoins}
                      </div>
                    </div>
                  );
                })
              : "Loading..."}
          </div>
        </div>
        <div className="w-3/5 max-h-full overflow-scroll">
          <NodeDetailsSidePanel
            node={selectedNode}
            graphData={detailsGraphData}
          />
        </div>
      </div>
      {tooltipVisible && <Tooltip content={tooltipClipboardContent} />}
    </div>
  );
}

const TABLE_HEADERS = [
  { name: "Rank", filter: true, key: "rank" },
  { name: "Address", filter: false, key: "address" },
  { name: "Task Contributed", filter: true, key: "taskContributed" },
  { name: "Reward Received", filter: true, key: "rewardReceived" },
  { name: "Delegated Coins", filter: true, key: "delegatedCoins" },
];

const BUTTON_CONFIG = [
  {
    id: "TRAINER",
    label: "Trainer Nodes",
  },
  {
    id: "VALIDATOR",
    label: "Validator Nodes",
  },
];

const DEFAULT_CLIPBOARD_TOOLTIP: string = "Click to copy to clipboard";

var TRAINER_NODES: NodeType[] = [];
var VALIDATOR_NODES: NodeType[] = [];
