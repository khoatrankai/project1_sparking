import { Tag } from "antd";
import React from "react";
import ModalAddProduct from "./ModalProduct/ModalAddProduct";
import ModalQrScanner from "./ModalProduct/ModalQrScanner";

import ModalTypeProduct from "./ModalProduct/ModalTypeProduct/ModalTypeProduct";
import ModalUnitProduct from "./ModalProduct/ModalUnitProduct/ModalUnitProduct";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

export default function ToolProduct() {
  const { datas: dataAbout } = useSelector(
    (state: RootState) => state.about_product
  );
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        <ModalAddProduct />
        <ModalTypeProduct />
        <ModalUnitProduct />
        <ModalQrScanner />
      </div>
      <div>
        <h2 className="font-semibold text-white">Tổng quan sản phẩm</h2>
        <div className="flex justify-around gap-2 flex-wrap">
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 border-0 bg-[#EB8823] shadow-lg shadow-black/20 bg-black/80">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.quantity_product.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Tổng số sản phẩm
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-[#EB8823] border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.quantity_active.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Sản phẩm đang bán
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-[#EB8823] border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.quantity_hide.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Sản phẩm ngưng bán
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-[#EB8823] border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.quantity_hire.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Số lượng sản phẩm cho thuê
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-[#EB8823] border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.quantity_stored.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Số lượng sản phẩm tồn kho
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-[#EB8823] border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.quantity_ordered.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Số lượng sản phẩm đã bán
            </p>
          </Tag>
        </div>
      </div>
    </div>
  );
}
