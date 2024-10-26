import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TimeRangeSelector } from ".";

export const RewardChart = () => {
  const [data, setData] = useState<RewardDataType[]>(
    Array.from({ length: 100 }, (_, i) => ({
      name: i.toString(),
      value: i * 1000,
    }))
  );
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState("12m");

  useEffect(() => {
    const days =
      selectedTimeRange === "3m" ? 90 : selectedTimeRange === "6m" ? 180 : 365;
    const MOCK_DATA = Array.from({ length: days }, (_, i) => ({
      name: (i + 1).toString(),
      value: Math.floor(Math.log(i + 1) * 1000),
    }));
    console.log(MOCK_DATA);
    setData(MOCK_DATA);
    setLoading(false);
  }, [selectedTimeRange]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    } else {
      return num.toString();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col" style={{ width: "100%", height: "400px"}}>
      <TimeRangeSelector
        onSelect={(timeStamp) => setSelectedTimeRange(timeStamp)}
      />
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          height={400}
          width={870}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#eab308" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="0" vertical={false} />
          <XAxis dataKey="name" tick={{ fontWeight: "bold" }} />
          <YAxis tick={{ fontWeight: "bold" }} tickFormatter={formatNumber} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#27272A",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
            itemStyle={{ color: "#fff" }}
          />{" "}
          <Area
            type="monotone"
            dataKey="value"
            stroke="#eab308"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RewardChart;

type RewardDataType = {
  name: string;
  value: number;
};
