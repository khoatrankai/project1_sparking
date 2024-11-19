/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Project from "@/components/Project/Project";
import { fetchCustomerInfos } from "@/redux/store/slices/customerSlices/get_all_customer.slice";
import { fetchProjects } from "@/redux/store/slices/projectSlices/get_all_project.slice";
import { fetchUserInfo } from "@/redux/store/slices/userSlices/get_users.slice";
import { AppDispatch } from "@/redux/store/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// type Props = {}

export default function page() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchCustomerInfos());
    dispatch(fetchUserInfo());
  }, [dispatch]);
  return (
    <div className="p-4">
      <Project />
    </div>
  );
}
