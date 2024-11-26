/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Work from "@/components/Work/Work";
import { fetchActivities } from "@/redux/store/slices/activitySlices/activity.slice";
import { fetchStatusWork } from "@/redux/store/slices/activitySlices/status_work.slice";
import { fetchTypeWork } from "@/redux/store/slices/activitySlices/type_work.slice";
import { fetchWorks } from "@/redux/store/slices/activitySlices/work.slide";
import { fetchUserInfo } from "@/redux/store/slices/userSlices/get_users.slice";
import { AppDispatch } from "@/redux/store/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// type Props = {}

export default function page() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchActivities());
    dispatch(fetchWorks());
    dispatch(fetchUserInfo());
    dispatch(fetchTypeWork());
    dispatch(fetchStatusWork());
  }, [dispatch]);
  return (
    <div className="p-4">
      <Work />
    </div>
  );
}
