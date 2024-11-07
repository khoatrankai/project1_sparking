import React, { useEffect, useState } from "react";
import ToolProduct from "./ToolProduct/ToolProduct";
import ListProduct from "./ListProduct/ListProduct";
import { ProductInfo } from "@/models/productInterface";
import productService from "@/services/productService";

// type Props = {};

export default function Product() {
  const [dataSource, setDataSource] = useState<ProductInfo[] | []>([]);
  const fetchData = async () => {
    const data = await productService.getProducts();
    if (data.statusCode === 200) {
      setDataSource(data.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleRefreshData = () => {
    fetchData();
  };
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="bg-[#1BA399] p-2 rounded-md">
          <ToolProduct handleRefreshData={handleRefreshData} />
        </div>
        <div className="bg-[#1BA399] p-2 rounded-md">
          <ListProduct
            dataSource={dataSource}
            handleRefreshData={handleRefreshData}
          />
        </div>
      </div>
    </div>
  );
}
