import React from "react";
// import ListPropose from "./List/ListUser";
import ToolPriceQuote from "./Tool/ToolUser";
import ListUser from "./List/ListUser";

// type Props = {}

export default function User() {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-[#00A9AE] p-2 rounded-md">
        <ToolPriceQuote />
      </div>
      <div className="bg-[#00A9AE] p-2 rounded-md">
        <ListUser />
      </div>
    </div>
  );
}
