import React from "react";
import ToolCustomer from "./ToolCustomer/ToolCustomer";
import ListCustomer from "./ListCustomer/ListCustomer";

// type Props = {};

export default function Customer() {
  return (
    <div>
      <div className="flex flex-col rounded-md p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white">
        <div className="rounded-md">
          <ToolCustomer />
        </div>
        <div className="rounded-md">
          <ListCustomer />
        </div>
      </div>
    </div>
  );
}
