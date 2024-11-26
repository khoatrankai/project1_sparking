/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import User from "@/components/User/User";
import { fetchUserInfo } from "@/redux/store/slices/userSlices/get_users.slice";
import { AppDispatch } from "@/redux/store/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// type Props = {}

export default function page() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);
  return (
    <div className="p-4">
      <User />
    </div>
  );
}
