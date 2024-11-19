import React from "react";
import ToolProduct from "./Tool/ToolProject";
import ListProduct from "./List/ListProject";

// type Props = {};

export default function Project() {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="bg-[#00A9AE] p-2 rounded-md">
          <ToolProduct />
        </div>
        <div className="bg-[#00A9AE] p-2 rounded-md">
          <ListProduct />
        </div>
      </div>
    </div>
  );
}
