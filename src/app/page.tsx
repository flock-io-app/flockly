"use client";
import React, { useEffect, useState } from "react";
import {
  Header,
  RadioButtonGroup,
  NodeDetailsSidePanel,
  Tooltip,
} from "./components";
import { NodeType, Tabs } from "./types";

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
  useEffect(() => {
    if (currentlySelectedTab.tab === "TRAINER") {
      setNodes(MOCK_NODES_TRAINERS);
      setSelectedNode(MOCK_NODES_TRAINERS[0]);
    } else {
      setNodes(MOCK_NODES_VALIDATORS);
      setSelectedNode(MOCK_NODES_VALIDATORS[0]);
    }
    handleSort(currentSortKey);
  }, [currentlySelectedTab, currentSortKey]);

  const radioButtonsHandler = (buttonId: Tabs) => {
    setCurrentlySelectedTab(buttonId);
    setSortAsc(false);
    setCurrentSortKey("rank");
    // handleSort(currentSortKey);
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

  return (
    <div className="flex flex-col h-screen bg-zinc-900 px-5 overflow-x-hidden overflow-y-scroll">
      <Header />
      <div className="flex justify-center w-full my-5">
        <RadioButtonGroup
          buttonsConfig={BUTTON_CONFIG}
          handler={radioButtonsHandler}
          initTab={currentlySelectedTab}
        />
      </div>

      <div className="flex h-max flex-row my-5 border-t-2 rounded-xl pt-10 bg-gradient-to-t from-zinc-800 to-zinc-950">
        <div className="h-max grid grid-cols-5 gap-y-5 m-2 px-5 overflow-scroll">
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
          <div className="col-span-5 h-5/6 p-5 grid grid-cols-5 gap-y-5 overflow-x-hidden overflow-y-scroll overscroll-contain">
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

        <div></div>
        <div className="w-3/5">
          <NodeDetailsSidePanel node={selectedNode} />
        </div>
      </div>
      {tooltipVisible && <Tooltip content={tooltipClipboardContent} />}
    </div>
  );
}

const MOCK_NODES_TRAINERS = [
  {
    name: "1GGqoaTW2QYutbX9wbX5Fkgu4oc26HWdAb",
    history: [
      { taskId: 1, status: false, rewardReceived: 10 },
      { taskId: 5, status: true, rewardReceived: 20 },
      { taskId: 8, status: true, rewardReceived: 60 },
    ],
    taskContributed: 10,
    rewardReceived: 40,
    delegatedCoins: 100,
    address: "1GGqoaTW2QYutbX9wbX5Fkgu4oc26HWdAb",
    rank: 1,
  },
  {
    name: "17QMbkNEZy8PBWbxn1QxYE1h9x2V5FvzS9",
    history: [{ taskId: 4, status: false, rewardReceived: 15 }],
    taskContributed: 15,
    rewardReceived: 60,
    delegatedCoins: 120,
    address: "17QMbkNEZy8PBWbxn1QxYE1h9x2V5FvzS9",
    rank: 2,
  },
  {
    name: "17QMbkNEZy8PBWbxn1QxYE1h9x2V5FvzS9",
    history: [{ taskId: 7, status: true, rewardReceived: 32 }],
    taskContributed: 1,
    rewardReceived: 50,
    delegatedCoins: 3,
    address: "17QMbkNEZy8PBWbxn1QxYE1h9x2V5FvzS9",
    rank: 3,
  },
];

const MOCK_NODES_VALIDATORS = [
  {
    name: "1GGqoaTW2QYutbX9wbX5Fkgu4oc26HWdAb",
    history: [
      { taskId: 1, status: false, rewardReceived: 10 },
      { taskId: 5, status: true, rewardReceived: 20 },
      { taskId: 8, status: true, rewardReceived: 60 },
    ],
    taskContributed: 10,
    rewardReceived: 40,
    delegatedCoins: 100,
    address: "1GGqoaTW2QYutbX9wbX5Fkgu4oc26HWdAb",
    rank: 1,
  },
  {
    name: "17QMbkNEZy8PBWbxn1QxYE1h9x2V5FvzS9",
    history: [{ taskId: 4, status: false, rewardReceived: 15 }],
    taskContributed: 15,
    rewardReceived: 60,
    delegatedCoins: 120,
    address: "17QMbkNEZy8PBWbxn1QxYE1h9x2V5FvzS9",
    rank: 2,
  },
  {
    name: "17QMbkNEZy8PBWbxn1QxYE1h9x2V5FvzS9",
    history: [{ taskId: 7, status: true, rewardReceived: 32 }],
    taskContributed: 1,
    rewardReceived: 50,
    delegatedCoins: 3,
    address: "17QMbkNEZy8PBWbxn1QxYE1h9x2V5FvzS9",
    rank: 3,
  },
];

const TABLE_HEADERS = [
  { name: "Rank", filter: true, key: "rank" },
  { name: "Address", filter: false, key: "address" },
  { name: "Task Contributed", filter: true, key: "taskContributed" },
  { name: "Reward Received", filter: true, key: "rewardReceived" },
  { name: "Staked Coins", filter: true, key: "delegatedCoins" },
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
