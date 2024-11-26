import React from "react";
import ToolActivityExport from "./Tool/TooActivityExport";
import ListActivityExport from "./List/ListActivityExport";

// type Props = {}

export default function ActivityExport() {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-[#00A9AE] p-2 rounded-md">
        <ToolActivityExport />
      </div>
      <div className="bg-[#00A9AE] p-2 rounded-md">
        <ListActivityExport />
      </div>
    </div>
  );
}
