import React, { useState } from "react";
import { Tabs } from "../types";
interface RadioButtonGroupProps {
  buttonsConfig: { id: string; label: string }[];
  handler: (buttonId: Tabs) => void;
  initTab: Tabs;
}
const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  buttonsConfig,
  handler,
  initTab,
}) => {
  const [selectedButton, setSelectedButton] = useState<string>(initTab.tab);

  const radioButtonHandler = (buttonId: Tabs) => {
    setSelectedButton(buttonId.tab);
    handler(buttonId);
  };
  return (
    <div className="flex flex-row space-x-4">
      {buttonsConfig.map(
        (config: { id: string; label: string }, index: number) => {
          return (
            <div
              key={index}
              className={`text-xl py-5 cursor-pointer ${
                selectedButton === config.id ? "selected" : "radio-button"
              } p-2`}
              onClick={() => radioButtonHandler({ tab: config.id } as Tabs)}
            >
              {" "}
              {config.label}{" "}
            </div>
          );
        }
      )}
    </div>
  );
};

export default RadioButtonGroup;
