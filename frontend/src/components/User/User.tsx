import React from "react";
// import ListPropose from "./List/ListUser";
import ToolPriceQuote from "./Tool/ToolUser";
import ListUser from "./List/ListUser";

// type Props = {}

export default function User() {
  return (
    <div className="flex flex-col rounded-md p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white">
      <div className="rounded-md">
        <ToolPriceQuote />
      </div>
      <div className="rounded-md">
        <ListUser />
      </div>
    </div>
  );
}
