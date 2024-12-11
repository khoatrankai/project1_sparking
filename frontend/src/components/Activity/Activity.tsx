import React from "react";
import ListActivity from "./List/ListActivity";
import ToolActivity from "./Tool/ToolActivity";

// type Props = {}

export default function Activity() {
  return (
    <div className="flex flex-col rounded-md p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white">
      <div className=" p-2 ">
        <ToolActivity />
      </div>
      <div className=" p-2">
        <ListActivity />
      </div>
    </div>
  );
}
