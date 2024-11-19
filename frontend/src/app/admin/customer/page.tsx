"use client";
import Customer from "@/components/Customer/Customer";
import { fetchCustomerAbout } from "@/redux/store/slices/customerSlices/about_customer.slice";
import { fetchCustomerInfos } from "@/redux/store/slices/customerSlices/get_all_customer.slice";
import { fetchSystemProvinces } from "@/redux/store/slices/systemSlices/get_province.slice";
import { AppDispatch } from "@/redux/store/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// type Props = {}

export default function page() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCustomerInfos());
    dispatch(fetchCustomerAbout());
    dispatch(fetchSystemProvinces());
  }, [dispatch]);
  return (
    <div className="p-4">
      <Customer />
    </div>
  );
}
