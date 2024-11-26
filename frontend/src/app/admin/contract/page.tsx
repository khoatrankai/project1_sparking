/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Contract from "@/components/Contract/Contract";
import { fetchContracts } from "@/redux/store/slices/contractSlices/contract.slide";
import { fetchTypeContracts } from "@/redux/store/slices/contractSlices/type_contract.slide";
import { fetchCustomerInfos } from "@/redux/store/slices/customerSlices/get_all_customer.slice";
import { fetchPriceQuotes } from "@/redux/store/slices/priceQuoteSlices/get_price_quotes.slice";
import { fetchProductInfos } from "@/redux/store/slices/productSlices/get_products";
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
    dispatch(fetchProductInfos());
    dispatch(fetchPriceQuotes({}));
    dispatch(fetchContracts());
    dispatch(fetchTypeContracts());
  }, [dispatch]);
  return (
    <div className="p-4">
      <Contract />
    </div>
  );
}
