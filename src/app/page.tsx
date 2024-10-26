"use client";
import { useState } from "react";
import { Header, ListSelector } from "./components/Index";
export default function Home() {
  const [selectedNode, setSelectedNode] = useState("");
  const [nodes, setNodes] = useState(MOCK_NODES_TRAINERS);
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div>Filters</div>
      <ListSelector />
      <div className="flex flex-row w-full h-full">
        <table className="w-9/12 table-auto text-center text-FlockBlack ">
          <thead>
            <tr>
              <th className="filterable">Rank</th>
              <th>Node</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node) => {
              return (
                <tr
                  className="node-row size-auto"
                  key={node.name}
                  onClick={() => setSelectedNode(node)}
                >
                  <td>{node.rank}</td>
                  <td>{node.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <NodeDetailsModal node={selectedNode} />
      <div></div>
    </div>
  );
}
interface NodeDetailsModalProps {
  node: NodeType;
}
const NodeDetailsModal: React.FC<NodeDetailsModalProps> = ({ node }) => {
  return <div>{node.name}</div>;
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
