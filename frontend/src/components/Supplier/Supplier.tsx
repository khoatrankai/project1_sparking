import React from "react";
import ToolSupplier from "./Tool/ToolSupplier";
import ListSupplier from "./List/ListSupplier";

// type Props = {}

export default function Supplier() {
  return (
    <div className="flex flex-col rounded-md p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white">
      <div className="rounded-md">
        <ToolSupplier />
      </div>
      <div className="rounded-md">
        <ListSupplier />
      </div>
    </div>
  );
}
