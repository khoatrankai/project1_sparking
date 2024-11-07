import { Tag } from "antd";
import React from "react";
import useFetchData from "@/hooks/useFetchData";
import ModalAddProduct from "./ModalProduct/ModalAddProduct";
import ModalQrScanner from "./ModalProduct/ModalQrScanner";
import { IAboutProduct } from "@/models/productInterface";
import productService from "@/services/productService";

type Props = {
  handleRefreshData: () => void;
};

export default function ToolProduct({ handleRefreshData }: Props) {
  const { data: dataAbout } = useFetchData<IAboutProduct>(
    productService.getAboutProduct
  );
  return (
    <div className="flex flex-col gap-2">
      <div>
        <ModalAddProduct handleRefreshData={handleRefreshData} />{" "}
        <ModalQrScanner />
      </div>
      <div>
        <h2 className="font-semibold">Tổng quan sản phẩm</h2>
        <div className="flex justify-around gap-2 flex-wrap">
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 border-0 shadow-lg shadow-black/20 bg-black/80">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.quantity_product.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Tổng số sản phẩm
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-green-500/80 border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.quantity_active.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Sản phẩm đang bán
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-red-500/80 border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.quantity_hide.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Sản phẩm ngưng bán
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-blue-500/80 border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.quantity_hire.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Số lượng sản phẩm cho thuê
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-yellow-500/80 border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.quantity_stored.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Số lượng sản phẩm tồn kho
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-green-600/80 border-0 shadow-lg  shadow-black/20">
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
