/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Activity from "@/components/Activity/Activity";
import { fetchActivities } from "@/redux/store/slices/activitySlices/activity.slice";
import { fetchStatusActivities } from "@/redux/store/slices/activitySlices/status_activity.slice";
import { fetchTypeActivities } from "@/redux/store/slices/activitySlices/type_activity.slice";
import { fetchTypeWork } from "@/redux/store/slices/activitySlices/type_work.slice";
import { fetchContracts } from "@/redux/store/slices/contractSlices/contract.slide";
import { fetchUserInfo } from "@/redux/store/slices/userSlices/get_users.slice";
import { AppDispatch } from "@/redux/store/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// type Props = {}

export default function page() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchActivities());
    dispatch(fetchTypeActivities());
    dispatch(fetchTypeWork());
    // dispatch(fetchWorks());
    dispatch(fetchStatusActivities());
    dispatch(fetchUserInfo());
    // dispatch(fetchProductInfos());
    // dispatch(fetchPriceQuotes({}));
    dispatch(fetchContracts());
    // dispatch(fetchTypeContracts());
  }, [dispatch]);
  return (
    <div className="p-4">
      <Activity />
    </div>
  );
}
