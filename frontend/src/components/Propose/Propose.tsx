import React, { useEffect, useState } from "react";
import ToolPropose from "./ToolPropose/ToolPropose";
import ListPropose from "./ListPropose/ListPropose";
import { FilterPropose, GetPropose } from "@/models/proposeInterface";
import proposeService from "@/services/proposeService";

// type Props = {}

export default function Propose() {
  const [dataSource, setDataSource] = useState<GetPropose[] | []>([]);
  const [filterData, setFilterData] = useState<FilterPropose>({});
  const fetchData = async (filter: FilterPropose) => {
    const data = await proposeService.getFilterPropose(filter);
    if (data.statusCode === 200) {
      setDataSource(data.data);
    }
  };
  useEffect(() => {
    fetchData(filterData);
  }, [filterData]);
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-[#1BA399] p-2 rounded-md">
        <ToolPropose filterData={filterData} setFilterData={setFilterData} />
      </div>
      <div className="bg-[#1BA399] p-2 rounded-md">
        <ListPropose dataSource={dataSource} />
      </div>
    </div>
  );
}
