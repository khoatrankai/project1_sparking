import React from "react";
import ListActivity from "./List/ListActivity";
import ToolActivity from "./Tool/ToolActivity";

// type Props = {}

export default function Activity() {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-[#00A9AE] p-2 rounded-md">
        <ToolActivity />
      </div>
      <div className="bg-[#00A9AE] p-2 rounded-md">
        <ListActivity />
      </div>
    </div>
  );
}
