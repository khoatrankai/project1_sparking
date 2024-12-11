import React from "react";
import ListWork from "./List/ListWork";
import ToolWork from "./Tool/ToolWork";

// type Props = {}

export default function Work() {
  return (
    <div className="flex flex-col rounded-md p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white">
      <div className="rounded-md">
        <ToolWork />
      </div>
      <div className="rounded-md">
        <ListWork />
      </div>
    </div>
  );
}
