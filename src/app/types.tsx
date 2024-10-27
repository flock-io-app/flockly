type NodeType = {
  address: string;
  name: string;
  history: History[];
  rank: number;
  taskContributed: number;
  rewardReceived: number;
  delegatedCoins: number;
};

type Tabs = { tab: "TRAINER" | "VALIDATOR" };

type History = {
  taskId: number;
  name: string;
  action: string;
  rewardReceived: number;
};

export type { NodeType, Tabs, History };
