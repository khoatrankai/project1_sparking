import React from "react";
import ListPropose from "./List/ListPriceQuote";
import ToolPriceQuote from "./Tool/ToolPriceQuote";

// type Props = {}

export default function PriceQuote() {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-[#00A9AE] p-2 rounded-md">
        <ToolPriceQuote />
      </div>
      <div className="bg-[#00A9AE] p-2 rounded-md">
        <ListPropose />
      </div>
    </div>
  );
}
