import React from "react";
import ToolProduct from "./ToolProduct/ToolProduct";
import ListProduct from "./ListProduct/ListProduct";

// type Props = {};

export default function Product() {
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
