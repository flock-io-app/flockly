import React from "react";

interface TooltipProps {
  content: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ content }) => {
  return (
    <div
      id="tooltip-default"
      role="tooltip"
      className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center w-96 z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-100 tooltip dark:bg-gray-700"
    >
      {content}
      <div className="tooltip-arrow" data-popper-arrow></div>
    </div>
  );
};

export default Tooltip;
