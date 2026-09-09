import React from "react";

const priorityStyles = {
  Low: "bg-gray-100 text-gray-700 border-gray-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-red-50 text-red-700 border-red-200",
};

const PriorityBadge = ({ priority }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
        priorityStyles[priority] || priorityStyles.Low
      }`}
    >
      {priority}
    </span>
  );
};

export default PriorityBadge;
