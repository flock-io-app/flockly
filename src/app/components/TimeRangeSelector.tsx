import React, { useState } from "react";

interface TimeRangeSelectorProps {
  onSelect: (value: string) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState("12m");

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSelect(value);
  };

  return (
    <div className="flex justify-end text-left">
      <select
        value={selectedOption}
        onChange={handleSelect}
        className="flex mb-5 self-end appearance-none w-32 bg-zinc-800 border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="3m">3 Months</option>
        <option value="6m">6 Months</option>
        <option value="12m">12 Months</option>
      </select>
    </div>
  );
};

export default TimeRangeSelector;
