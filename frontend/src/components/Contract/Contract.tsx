import React from "react";
import ListContract from "./List/ListContract";
import ToolContract from "./Tool/ToolContract";

// type Props = {}

export default function Contract() {
  return (
    <div className="flex flex-col rounded-md p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white">
      <div className="rounded-md">
        <ToolContract />
      </div>
      <div className="rounded-md">
        <ListContract />
      </div>
    </div>
  );
}
