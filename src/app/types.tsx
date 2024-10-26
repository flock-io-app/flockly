type NodeType = {
  name: string;
  history: string[];
  rank: number;
};

type Tabs = { tab: "TRAINER" | "VALIDATOR" };

export type { NodeType, Tabs };
