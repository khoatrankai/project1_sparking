// import { Select, Tag } from "antd";
import React from "react";

import ModalTypeOpportunity from "./ModalOpportunity/ModalTypeOpportunity/ModalTypeOpportunity";
import ModalSourceOpportunity from "./ModalOpportunity/ModalSourceOpportunity/ModalSourceOpportunity";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store/store";
import ModalAddOpportunity from "./ModalOpportunity/ModalAddOpportunity";

export default function ToolOpportunity() {
  // const { datas: dataAbout } = useSelector(
  //   (state: RootState) => state.about_product
  // );
  return (
    <div className="flex flex-col gap-4  border-b-[1px] pb-4 border-black/5">
      <div className="flex gap-1">
        <ModalAddOpportunity />
        <ModalTypeOpportunity />
        <ModalSourceOpportunity />
      </div>
      <p className="text-sm font-semibold text-[#1BA399]">Được lọc theo:</p>
      {/* <div className="flex flex-wrap w-full items-center justify-end gap-2 border-b-[1px] border-black/5 pb-4 ">
        <Select
          placeholder="Dự án"
          style={{ minWidth: 120, flex: "1 1 0%" }}
          onChange={(e) => {
            setFilterData({ ...filterData, project: e });
          }}
          options={itemProject}
        />
        <Select
          placeholder="Ngày"
          style={{ minWidth: 120, flex: "1 1 0%" }}
          onChange={(e) => {
            setFilterData({ ...filterData, type_date: e });
          }}
          options={itemsDate}
        />

        <RangePicker
          style={{ minWidth: 120, flex: "1 1 0%" }}
          onChange={(e, values) => {
            console.log("thay doi", values);
            if (values[0] !== "") {
              setFilterData({
                ...filterData,
                date_start: values[0],
                date_expired: values[1],
              });
            } else {
              dispatch(fetchPriceQuotes({}));
            }
          }}
        />
        <Select
          placeholder="Tình trạng"
          onChange={(e) => {
            setFilterData({ ...filterData, status: e });
          }}
          style={{ minWidth: 120, flex: "1 1 0%" }}
          options={itemsStatus}
        />
        <Select
          placeholder="Người phụ trách"
          showSearch
          filterOption={(input, option) => {
            return (option?.children?.join("") ?? "")
              .toLowerCase()
              .includes(input.toLowerCase());
          }}
          onChange={(e) => {
            setFilterData({ ...filterData, user_support: e });
          }}
          style={{ minWidth: 120, flex: "1 1 0%" }}
        >
          {dataUsers?.map((dt) => (
            <Option key={dt.user_id} value={dt.user_id}>
              {dt.first_name} {dt.last_name}
            </Option>
          ))}
        </Select>
      </div> */}
    </div>
  );
}
