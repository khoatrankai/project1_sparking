import { Tag } from "antd";
import React from "react";
import ModalAddCustomer from "./ModalCustomer/ModalAddCustomer";
import useFetchData from "@/hooks/useFetchData";
import customerService from "@/services/customerService";
import { ICustomerStatistics } from "@/models/customerInterface";

// type Props = {};

export default function ToolCustomer() {
  const { data: dataAbout } = useFetchData<ICustomerStatistics>(
    customerService.getAboutCustomer
  );
  return (
    <div className="flex flex-col gap-2">
      <div>
        <ModalAddCustomer />
      </div>
      <div>
        <h2 className="font-semibold">Tổng quan khách hàng</h2>
        <div className="flex justify-around gap-2 flex-wrap">
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 border-0 shadow-lg shadow-black/20 bg-black/80">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.totalCustomer.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Tổng số khách hàng
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-green-500/80 border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.totalActive.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Khách hàng đang hoạt động
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-red-500/80 border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.totalInActive.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Khách hàng không hoạt động
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-blue-500/80 border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.contactActive.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Liên hệ đang hoạt động
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-yellow-500/80 border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.contactInactive.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Liên hệ ít hoạt động
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-green-600/80 border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.contactActiveToday.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Liên hệ đăng nhập hôm nay
            </p>
          </Tag>
        </div>
      </div>
    </div>
  );
}
