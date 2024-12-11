import { Tag } from "antd";
import React from "react";
import ModalAddProject from "./Modal/ModalAddProject";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import ModalTypeProject from "./Modal/ModalTypeProject/ModalTypeProject";

export default function ToolProduct() {
  const { datas: dataAbout } = useSelector(
    (state: RootState) => state.about_product
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1 border-b-[1px] pb-4 border-black/5">
        <ModalAddProject />
        <ModalTypeProject />
      </div>
      <div>
        <h2 className="font-semibold text-[#1BA399]">Tóm lược dự án</h2>
        <div className="flex justify-around gap-2 flex-wrap">
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 border-0 bg-[#EB8823] shadow-lg shadow-black/20 ">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.quantity_product.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">Tổng số dự án</p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-[#EB8823] border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.quantity_active.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">Chưa bắt đầu</p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-[#EB8823] border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.quantity_hide.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">Đang thực hiện</p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-[#EB8823] border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.quantity_hire.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">Tạm ngưng</p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-[#EB8823] border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.quantity_stored.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">Đã hủy</p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-[#EB8823] border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.quantity_ordered.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">Hoàn thành</p>
          </Tag>
        </div>
      </div>
    </div>
  );
}
