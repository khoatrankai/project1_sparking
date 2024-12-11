"use client";
import React from "react";
import ToolOpportunity from "./Tool/ToolOpportunity";
import ListOpportunities from "./ListOpportunity/ListOpportunity";

export default function Opportunity() {
  return (
    <div>
      <div className="flex flex-col rounded-md p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white">
        <div className="rounded-md">
          <ToolOpportunity />
        </div>
        <div className="rounded-md">
          <ListOpportunities />
        </div>
      </div>
    </div>
  );
}
