import React from "react";
import ToolSupplier from "./Tool/ToolSupplier";
import ListSupplier from "./List/ListSupplier";

// type Props = {}

export default function Supplier() {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-[#00A9AE] p-2 rounded-md">
        <ToolSupplier />
      </div>
      <div className="bg-[#00A9AE] p-2 rounded-md">
        <ListSupplier />
      </div>
    </div>
  );
}
