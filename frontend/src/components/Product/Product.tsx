import React from "react";
import ToolProduct from "./ToolProduct/ToolProduct";
import ListProduct from "./ListProduct/ListProduct";

// type Props = {};

export default function Product() {
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
