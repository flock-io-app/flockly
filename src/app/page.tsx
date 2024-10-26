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
      <div>Filters</div>
      <RadioButtonGroup
        buttonsConfig={BUTTON_CONFIG}
        handler={radioButtonsHandler}
        initTab={currentlySelectedTab}
      />
      <div className="flex flex-row">
        <div className="w-full h-full">
          <div className={`grid grid-cols-2`}>
            {TABLE_HEADERS.map((header, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    header.filter ? "filterable" : ""
                  } rounded-lg px-4`}
                >
                  {header.name}
                </div>
              );
            })}
          </div>
          <div className={`grid grid-cols-2 gap-2`}>
            {nodes
              ? nodes.map((node, index) => {
                  return (
                    <div
                      key={index}
                      className={`col-span-2 grid grid-cols-2 hover:bg-FlockGrey py-2`}
                      onClick={() => setSelectedNode(node)}
                    >
                      <div>{node.rank}</div>
                      <div>{node.name}</div>
                    </div>
                  );
                })
              : ""}
          </div>

          <div></div>
        </div>
        <div>
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
    name: "node1",
    history: ["hist1"],
    rank: 1,
  },
  {
    name: "node2",
    history: ["hist1"],
    rank: 2,
  },
];
const MOCK_NODES_VALIDATORS = [
  {
    name: "node3",
    history: ["hist1"],
    rank: 1,
  },
  {
    name: "node4",
    history: ["hist1"],
    rank: 2,
  },
];

const TABLE_HEADERS = [
  { name: "Rank", filter: true },
  { name: "Node", filter: false },
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
