import { IGetProductInfo } from "@/models/productInterface"; // Updated import
import {
  Button,
  Dropdown,
  Select,
  Switch,
  Table,
  TableColumnsType,
} from "antd";
import Search from "antd/es/input/Search";
import { TableRowSelection } from "antd/es/table/interface";
import React, { useEffect, useState } from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import ModalUpdateProduct from "../ToolProduct/ModalProduct/ModalUpdateProduct";
import productService from "@/services/productService";
import usePostData from "@/hooks/usePostData";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { fetchProductAbout } from "@/redux/store/slices/productSlices/get_about.slice";
import { useDispatch } from "react-redux";
// import ModalUpdateProduct from "../ToolProduct/ModalProduct/ModalUpdateProduct"

export default function ListProduct() {
  const { postdata } = usePostData();
  const dispatch = useDispatch<AppDispatch>();
  const { datas: dataVats } = useSelector(
    (state: RootState) => state.vat_system
  );

  const [pageLimit, setPageLimit] = useState<number>(25);
  const [dataFilter, setDataFilter] = useState<
    IGetProductInfo[] | [] | undefined
  >();
  const { datas: dataSource } = useSelector(
    (state: RootState) => state.info_products
  );
  const columns: TableColumnsType<IGetProductInfo> = [
    {
      title: "#",
      className: "text-xl",
      dataIndex: "product_id",
      render: (value: string, record, index) => (
        <div className="flex flex-col gap-1 ">
          <strong>
            #{index + 1}.{`${value.slice(0, 10)}...`}
          </strong>
          <div className="flex gap-2">
            <Button type="text" ghost className="text-xl text-blue-600">
              View
            </Button>
            <ModalUpdateProduct productID={value} />
          </div>
        </div>
      ),
      sorter: (a: IGetProductInfo, b: IGetProductInfo) =>
        a.product_id.localeCompare(b.product_id),
    },
    {
      title: "Tên sản phẩm",
      className: "text-xl",
      dataIndex: "name",
      render: (value: string) => (
        <>{value.length > 15 ? `${value.slice(0, 15)}...` : value}</>
      ),
      sorter: (a: IGetProductInfo, b: IGetProductInfo) =>
        a.name.localeCompare(b.name),
    },
    {
      title: "Loại sản phẩm",
      className: "text-xl",
      dataIndex: ["type", "name"],
      sorter: (a: IGetProductInfo, b: IGetProductInfo) =>
        a.type.name.localeCompare(b.type.name),
      render: (value) => <>{value}</>,
    },
    {
      title: "Giá trị",
      className: "text-xl",
      dataIndex: "price",
      render: (value: number) => `${value.toLocaleString("vi-VN")}đ`,
      sorter: (a: IGetProductInfo, b: IGetProductInfo) => a.price - b.price,
    },
    {
      title: "Thuế",
      className: "text-xl",
      dataIndex: "vat",
      sorter: (a: IGetProductInfo, b: IGetProductInfo) =>
        a.vat.localeCompare(b.vat),
      render: (value) => (
        <>
          {
            dataVats?.find((dt) => {
              return dt.vat_id === value;
            })?.type_vat
          }
          %
        </>
      ),
    },
    {
      title: "Trạng thái",
      className: "text-xl",
      dataIndex: "status",
      render: (value: string, record: IGetProductInfo) => (
        <>
          <Switch
            defaultChecked={value === "active"}
            onChange={async (check) => {
              const statusCode = await postdata(() =>
                productService.updateStatusProduct(
                  record.product_id,
                  check ? "active" : "hide"
                )
              );
              if (statusCode === 200) {
                dispatch(fetchProductAbout());
              }
            }}
          />
        </>
      ),
      sorter: (a: IGetProductInfo, b: IGetProductInfo) =>
        a.status.localeCompare(b.status),
    },
    {
      title: "Số lượng",
      className: "text-xl",
      dataIndex: "quantity",
      sorter: (a: IGetProductInfo, b: IGetProductInfo) =>
        a.quantity - b.quantity,
    },
    {
      title: "Đơn vị",
      className: "text-xl",
      dataIndex: ["unit_product", "name_unit"],
      sorter: (a: IGetProductInfo, b: IGetProductInfo) =>
        a.unit_product.name_unit.localeCompare(b.unit_product.name_unit),
      render: (value) => <>{value}</>,
    },
  ];

  useEffect(() => {
    setDataFilter(dataSource);
  }, [dataSource]);

  const handleSearchFilter = (value: string) => {
    setDataFilter(
      dataSource?.filter((dt) => {
        return String(
          dt.product_id +
            " " +
            dt.name +
            " " +
            dt.type +
            " " +
            dt.price +
            " " +
            dt.quantity
        )
          .toLowerCase()
          .includes(value.toLowerCase());
      })
    );
  };

  const rowSelection: TableRowSelection<IGetProductInfo> = {};

  return (
    <div className="">
      <div className="flex justify-end">
        <a className=" text-white hover:text-black" href="">
          View All
        </a>
      </div>

      <div className="flex justify-between items-center mb-2 flex-wrap gap-y-2">
        <div className="flex items-center">
          <Select
            defaultValue={pageLimit}
            style={{ width: 83 }}
            onChange={(e) => setPageLimit(e)}
            options={[
              { value: 10, label: 10 },
              { value: 25, label: 25 },
              { value: 50, label: 50 },
              { value: 100, label: 100 },
              { value: 500, label: 500 },
              { value: 1000, label: 1000 },
              { value: 100000000, label: "All" },
            ]}
          />
          <Dropdown className="ml-1" trigger={["click"]}>
            <Button>Export</Button>
          </Dropdown>
          <Button>
            <FaArrowsRotate />
          </Button>
        </div>
        <div className="flex items-center">
          <Search
            onChange={(e) => {
              handleSearchFilter(e.target.value);
            }}
            placeholder="Search"
            style={{ width: 200 }}
          />
        </div>
      </div>
      <div className="w-full overflow-auto">
        <div className="min-w-fit">
          <Table<IGetProductInfo>
            columns={columns}
            rowSelection={rowSelection}
            dataSource={dataFilter}
            pagination={{
              pageSize: pageLimit, // Items per page
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
            showSorterTooltip={{ target: "sorter-icon" }}
          />
        </div>
      </div>
    </div>
  );
}
