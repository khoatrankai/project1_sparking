"use client";
import React from "react";
import ToolOpportunity from "./Tool/ToolOpportunity";
import ListOpportunities from "./ListOpportunity/ListOpportunity";

export default function Opportunity() {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="bg-[#00A9AE] p-2 rounded-md">
          <ToolOpportunity />
        </div>
        <div className="bg-[#00A9AE] p-2 rounded-md">
          <ListOpportunities />
        </div>
      </div>
    </div>
  );
}
