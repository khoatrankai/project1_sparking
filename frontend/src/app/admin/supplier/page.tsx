/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Supplier from "@/components/Supplier/Supplier";
import { fetchSuppliers } from "@/redux/store/slices/productSlices/get_supplier.slice";
import { AppDispatch } from "@/redux/store/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// type Props = {}

export default function page() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);
  return (
    <div className="p-4">
      <Supplier />
    </div>
  );
}
