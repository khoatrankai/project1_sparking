/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Product from "@/components/Product/Product";
import { fetchProductAbout } from "@/redux/store/slices/productSlices/get_about.slice";
import { fetchProductInfos } from "@/redux/store/slices/productSlices/get_products";
import { fetchProductTypes } from "@/redux/store/slices/productSlices/get_type.slice";
import { fetchProductUnits } from "@/redux/store/slices/productSlices/get_unit.slice";
import { fetchSystemVats } from "@/redux/store/slices/systemSlices/get_vat.slice";
import { AppDispatch } from "@/redux/store/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// type Props = {};

export default function page() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProductTypes());
    dispatch(fetchProductUnits());
    dispatch(fetchProductInfos());
    dispatch(fetchSystemVats());
    dispatch(fetchProductAbout());
  }, [dispatch]);
  return (
    <div className="p-4">
      <Product />
    </div>
  );
}
