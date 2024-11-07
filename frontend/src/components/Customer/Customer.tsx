import React, { useEffect, useState } from "react";
import ToolCustomer from "./ToolCustomer/ToolCustomer";
import ListCustomer from "./ListCustomer/ListCustomer";
import customerService from "@/services/customerService";
import { CustomerInfo } from "@/models/customerInterface";

// type Props = {};

export default function Customer() {
  const [dataSource, setDataSource] = useState<CustomerInfo[] | []>([]);
  const fetchData = async () => {
    const data = await customerService.getAllCustomer();
    if (data.statusCode === 200) {
      setDataSource(data.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="bg-[#1BA399] p-2 rounded-md">
          <ToolCustomer />
        </div>
        <div className="bg-[#1BA399] p-2 rounded-md">
          <ListCustomer dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
