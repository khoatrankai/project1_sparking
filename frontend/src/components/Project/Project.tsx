import React from "react";
import ToolProduct from "./Tool/ToolProject";
import ListProduct from "./List/ListProject";

// type Props = {};

export default function Project() {
  return (
    <div>
      <div className="flex flex-col rounded-md p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white">
        <div className="rounded-md">
          <ToolProduct />
        </div>
        <div className="rounded-md">
          <ListProduct />
        </div>
      </div>
    </div>
  );
}
