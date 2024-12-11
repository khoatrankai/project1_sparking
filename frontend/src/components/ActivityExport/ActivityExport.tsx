import React from "react";
import ToolActivityExport from "./Tool/ToolActivityExport";
import ListActivityExport from "./List/ListActivityExport";

// type Props = {}

export default function ActivityExport() {
  return (
    <div className="flex flex-col rounded-md p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white">
      <div className="rounded-md">
        <ToolActivityExport />
      </div>
      <div className="rounded-md">
        <ListActivityExport />
      </div>
    </div>
  );
}
