import React from "react";
import ListContract from "./List/ListContract";
import ToolContract from "./Tool/ToolContract";

// type Props = {}

export default function Contract() {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-[#00A9AE] p-2 rounded-md">
        <ToolContract />
      </div>
      <div className="bg-[#00A9AE] p-2 rounded-md">
        <ListContract />
      </div>
    </div>
  );
}
