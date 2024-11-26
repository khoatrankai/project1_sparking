import React from "react";
import ListWork from "./List/ListWork";
import ToolWork from "./Tool/ToolWork";

// type Props = {}

export default function Work() {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-[#00A9AE] p-2 rounded-md">
        <ToolWork />
      </div>
      <div className="bg-[#00A9AE] p-2 rounded-md">
        <ListWork />
      </div>
    </div>
  );
}
