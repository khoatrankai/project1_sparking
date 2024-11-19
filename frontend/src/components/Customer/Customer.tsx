import React, { useEffect, useState } from "react";
import ToolCustomer from "./ToolCustomer/ToolCustomer";
import ListCustomer from "./ListCustomer/ListCustomer";
import customerService from "@/services/customerService";
import { CustomerInfo } from "@/models/customerInterface";

// type Props = {};

export default function Customer() {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="bg-[#00A9AE] p-2 rounded-md">
          <ToolCustomer />
        </div>
        <div className="bg-[#00A9AE] p-2 rounded-md">
          <ListCustomer />
        </div>
      </div>
    </div>
  );
}
