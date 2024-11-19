/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Opportunity from "@/components/Opportunity/Opportunity";
import { fetchOpportunities } from "@/redux/store/slices/opportunitySlices/get_opportunities.slice";
import { fetchSourcesOpportunity } from "@/redux/store/slices/opportunitySlices/get_source.slice";
import { fetchOpportunityTypes } from "@/redux/store/slices/opportunitySlices/get_type.slice";
import { fetchSystemProvinces } from "@/redux/store/slices/systemSlices/get_province.slice";
import { fetchUserInfo } from "@/redux/store/slices/userSlices/get_users.slice";
import { AppDispatch } from "@/redux/store/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function page() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSystemProvinces());
    dispatch(fetchOpportunityTypes());
    dispatch(fetchSourcesOpportunity());
    dispatch(fetchUserInfo());
    dispatch(fetchOpportunities());
  }, [dispatch]);
  return (
    <div className="p-4">
      <Opportunity />
    </div>
  );
}
