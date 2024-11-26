/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import PriceQuote from "@/components/PriceQuote/PriceQuote";
import { fetchCustomerInfos } from "@/redux/store/slices/customerSlices/get_all_customer.slice";
import { fetchPriceQuotes } from "@/redux/store/slices/priceQuoteSlices/get_price_quotes.slice";
import { fetchProductInfos } from "@/redux/store/slices/productSlices/get_products";
import { fetchProjects } from "@/redux/store/slices/projectSlices/get_all_project.slice";
import { fetchSystemProfits } from "@/redux/store/slices/systemSlices/get_profit.slice";
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
    dispatch(fetchSystemProfits());
  }, [dispatch]);
  return (
    <div className="p-4">
      <PriceQuote />
    </div>
  );
}
