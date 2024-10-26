"use client";
import { useEffect, useState } from "react";
import { Header, RadioButtonGroup } from "./components/Index";
import { NodeType, Tabs } from "./types";

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<NodeType>();
  const [nodes, setNodes] = useState<NodeType[]>();
  const [currentlySelectedTab, setCurrentlySelectedTab] = useState<Tabs>({
    tab: "TRAINER",
  });

  useEffect(() => {
    if (currentlySelectedTab.tab === "TRAINER") {
      setNodes(MOCK_NODES_TRAINERS);
    } else {
      setNodes(MOCK_NODES_VALIDATORS);
    }
  }, [currentlySelectedTab]);

  const radioButtonsHandler = (buttonId: Tabs) => {
    setCurrentlySelectedTab(buttonId);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <RadioButtonGroup
        buttonsConfig={BUTTON_CONFIG}
        handler={radioButtonsHandler}
        initTab={currentlySelectedTab}
      />
      <div className="flex flex-row border-t mt-5">
        <div className="w-full h-full m-5 border-r">
          <div className={`grid grid-cols-5 text-center`}>
            {TABLE_HEADERS.map((header, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    header.filter ? "filterable" : ""
                  } rounded-lg px-4 font-bold`}
                >
                  {header.name}
                </div>
              );
            })}
          </div>
          <div className={`grid grid-cols-5 gap-2`}>
            {nodes
              ? nodes.map((node, index) => {
                  return (
                    <div
                      key={index}
                      className={`col-span-5 grid grid-cols-5 hover:bg-FlockGrey py-2 text-center`}
                      onClick={() => setSelectedNode(node)}
                    >
                      <div className="node-table-cell">{node.rank}</div>
                      <div className="node-table-cell">{node.name}</div>
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
              : ""}
          </div>

          <div></div>
        </div>
        <div className="m-5">
          selected
          <NodeDetailsModal node={selectedNode} />
        </div>
      </div>
    </div>
  );
}
interface NodeDetailsModalProps {
  node?: NodeType;
}
const NodeDetailsModal: React.FC<NodeDetailsModalProps> = ({ node }) => {
  return <div>{node?.name}</div>;
};

const MOCK_NODES_TRAINERS = [
  {
    name: "1GGqoaTW2QYutbX9wbX5Fkgu4oc26HWdAb",
    history: ["hist1"],
    taskContributed: 10,
    rewardReceived: 40,
    delegatedCoins: 100,
    rank: 1,
  },
  {
    name: "17QMbkNEZy8PBWbxn1QxYE1h9x2V5FvzS9",
    history: ["hist1"],
    taskContributed: 15,
    rewardReceived: 60,
    delegatedCoins: 120,
    rank: 2,
  },
];
const MOCK_NODES_VALIDATORS = [
  {
    name: "1KQcyhGc5U3K5Q3yEapFdKwhyJ9SkdqQrz",
    history: ["hist1"],
    taskContributed: 2,
    rewardReceived: 10,
    delegatedCoins: 5,
    rank: 1,
  },
  {
    name: "18fvFWvmAXbHPMVQ3ZcJNmMPRa3zt6sETS",
    history: ["hist1"],
    taskContributed: 6,
    rewardReceived: 20,
    delegatedCoins: 10,
    rank: 2,
  },
];

const TABLE_HEADERS = [
  { name: "Rank", filter: true },
  { name: "Address", filter: false },
  { name: "Task contributed", filter: true },
  { name: "Reward received", filter: true },
  { name: "Delegated coins", filter: true },
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
