/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Product from "@/components/Product/Product";
import { fetchProductAbout } from "@/redux/store/slices/productSlices/get_about.slice";
import { fetchProductBrands } from "@/redux/store/slices/productSlices/get_brand.slice";
import { fetchProductOriginals } from "@/redux/store/slices/productSlices/get_original.slice";
import { fetchProductInfos } from "@/redux/store/slices/productSlices/get_products";
import { fetchSuppliers } from "@/redux/store/slices/productSlices/get_supplier.slice";
import { fetchProductTypes } from "@/redux/store/slices/productSlices/get_type.slice";
import { fetchProductUnits } from "@/redux/store/slices/productSlices/get_unit.slice";
import { fetchSystemProfits } from "@/redux/store/slices/systemSlices/get_profit.slice";
import { fetchSystemVats } from "@/redux/store/slices/systemSlices/get_vat.slice";
import { AppDispatch } from "@/redux/store/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// type Props = {};

export default function page() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProductTypes());
    dispatch(fetchProductBrands());
    dispatch(fetchProductOriginals());
    dispatch(fetchProductUnits());
    dispatch(fetchSuppliers());
    dispatch(fetchProductInfos());
    dispatch(fetchSystemVats());
    dispatch(fetchSystemProfits());
    dispatch(fetchProductAbout());
  }, [dispatch]);
  return (
    <div className="p-4">
      <Product />
    </div>
  );
}
