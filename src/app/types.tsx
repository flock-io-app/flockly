type NodeType = {
  address: string;
  name: string;
  history: object[];
  rank: number;
  taskContributed: number;
  rewardReceived: number;
  delegatedCoins: number;
};

type Tabs = { tab: "TRAINER" | "VALIDATOR" };

type History = {
  taskId: number;
  status: boolean;
  rewardReceived: number;
};

export type { NodeType, Tabs, History };
