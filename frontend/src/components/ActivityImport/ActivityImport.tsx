import React from "react";
import ToolActivityImport from "./Tool/ToolActivityImport";
import ListActivityImport from "./List/ListActivityImport";

// type Props = {}

export default function ActivityImport() {
  return (
    <div className="flex flex-col rounded-md p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white">
      <div className="rounded-md">
        <ToolActivityImport />
      </div>
      <div className="rounded-md">
        <ListActivityImport />
      </div>
    </div>
  );
}
