type NodeType = {
  name: string;
  history: string[];
  rank: number;
  taskContributed: number;
  rewardReceived: number;
  delegatedCoins: number;
};

type Tabs = { tab: "TRAINER" | "VALIDATOR" };

export type { NodeType, Tabs };
