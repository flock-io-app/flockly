import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const RewardChart = () => {

  const [data, setData] = useState<RewardDataType[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(MOCK_DATA);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="w-full justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart height={300} width={800} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RewardChart;

type RewardDataType = {
  name: string;
  value: number;
};

const MOCK_DATA = [
  { name: 'Day 1', value: 100 },
  { name: 'Day 2', value: 120 },
  { name: 'Day 3', value: 130 },
  { name: 'Day 4', value: 90 },
  { name: 'Day 5', value: 150 },
  { name: 'Day 6', value: 110 },
  { name: 'Day 7', value: 170 },
  { name: 'Day 8', value: 160 },
  { name: 'Day 9', value: 180 },
  { name: 'Day 10', value: 140 },
  { name: 'Day 11', value: 200 },
  { name: 'Day 12', value: 210 },
  { name: 'Day 13', value: 190 },
  { name: 'Day 14', value: 220 },
  { name: 'Day 15', value: 230 },
  { name: 'Day 16', value: 210 },
  { name: 'Day 17', value: 250 },
  { name: 'Day 18', value: 240 },
  { name: 'Day 19', value: 260 },
  { name: 'Day 20', value: 220 },
  { name: 'Day 21', value: 270 },
  { name: 'Day 22', value: 280 },
  { name: 'Day 23', value: 300 },
  { name: 'Day 24', value: 250 },
  { name: 'Day 25', value: 310 },
  { name: 'Day 26', value: 320 },
  { name: 'Day 27', value: 340 },
  { name: 'Day 28', value: 290 },
  { name: 'Day 29', value: 350 },
  { name: 'Day 30', value: 360 },
  { name: 'Day 31', value: 380 },
  { name: 'Day 32', value: 330 },
  { name: 'Day 33', value: 400 },
  { name: 'Day 34', value: 410 },
  { name: 'Day 35', value: 430 },
  { name: 'Day 36', value: 380 },
  { name: 'Day 37', value: 450 },
  { name: 'Day 38', value: 460 },
  { name: 'Day 39', value: 480 },
  { name: 'Day 40', value: 430 },
  { name: 'Day 41', value: 500 },
  { name: 'Day 42', value: 510 },
  { name: 'Day 43', value: 530 },
  { name: 'Day 44', value: 490 },
  { name: 'Day 45', value: 550 },
  { name: 'Day 46', value: 560 },
  { name: 'Day 47', value: 580 },
  { name: 'Day 48', value: 530 },
  { name: 'Day 49', value: 600 },
  { name: 'Day 50', value: 620 }
];
