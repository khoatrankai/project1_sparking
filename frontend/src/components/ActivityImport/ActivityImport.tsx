import React from "react";
import ToolActivityImport from "./Tool/ToolActivityImport";
import ListActivityImport from "./List/ListActivityImport";

// type Props = {}

export default function ActivityImport() {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-[#00A9AE] p-2 rounded-md">
        <ToolActivityImport />
      </div>
      <div className="bg-[#00A9AE] p-2 rounded-md">
        <ListActivityImport />
      </div>
    </div>
  );
}
