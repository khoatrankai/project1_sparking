import { RootState } from "@/redux/store/store";
import { Button, Dropdown, Select, Table, TableColumnsType } from "antd";
import Search from "antd/es/input/Search";
import { TableRowSelection } from "antd/es/table/interface";
import React, { useEffect, useState } from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import { useSelector } from "react-redux";
import ModalUpdateActivity from "../Tool/Modal/ModalUpdateSupplier/ModalUpdateSupplier";
import { IGetSupplierProduct } from "@/models/productInterface";

export default function ListSupplier() {
  const [pageLimit, setPageLimit] = useState<number>(25);
  const { datas: dataSources } = useSelector(
    (state: RootState) => state.get_supplier
  );
  const [dataFilter, setDataFilter] = useState<
    IGetSupplierProduct[] | [] | undefined
  >([]);
  const columns: TableColumnsType<IGetSupplierProduct> = [
    {
      title: "#",
      className: "text-xs",
      dataIndex: "supplier_id",
      render: (value: string, red, index) => (
        <div className="flex flex-col gap-1 ">
          <strong>
            #{index + 1}.{`${value.slice(0, 10)}...`}
          </strong>
          <div className="flex gap-2">
            <Button type="text" ghost className="text-xs text-blue-600">
              Xem
            </Button>
            <ModalUpdateActivity ID={value} />
          </div>
        </div>
      ),
      sorter: (a: IGetSupplierProduct, b: IGetSupplierProduct) =>
        a.supplier_id.localeCompare(b.supplier_id),
    },

    {
      title: "Tên nhà cung ứng",
      dataIndex: "name",
      className: "text-xs",
      render: (value?: string) => value || "N/A",
      sorter: (a: IGetSupplierProduct, b: IGetSupplierProduct) =>
        (a.name || "").localeCompare(b.name || ""),
    },
    {
      title: "Email",
      dataIndex: "email",
      className: "text-xs",
      render: (value?: number) => (value ? `${value}` : "N/A"),
      sorter: (a: IGetSupplierProduct, b: IGetSupplierProduct) =>
        (a.email || "").localeCompare(b.email || ""),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      className: "text-xs",
      render: (value) => value || "N/A",
      sorter: (a: IGetSupplierProduct, b: IGetSupplierProduct) =>
        (a.phone_number || "").localeCompare(b.phone_number || ""),
    },
  ];
  useEffect(() => {
    setDataFilter(dataSources);
  }, [dataSources]);

  const handleSearchFilter = (value: string) => {
    setDataFilter(
      dataSources?.filter((dt) => {
        return String(
          dt.email +
            " " +
            dt.name +
            " " +
            dt.phone_number +
            " " +
            dt.supplier_id
        )
          .toLowerCase()
          .includes(value.toLowerCase());
      })
    );
  };

  const rowSelection: TableRowSelection<IGetSupplierProduct> = {};
  return (
    <div className="">
      <div className="flex justify-end">
        <a className=" text-white hover:text-black" href="">
          Xem tất cả
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
              { value: 100000000, label: "Tất cả" },
            ]}
          />
          <Dropdown className="ml-1" trigger={["click"]}>
            <Button>Xuất ra</Button>
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
            placeholder="Tìm kiếm"
            style={{ width: 200 }}
          />
        </div>
      </div>
      <div className="w-full overflow-auto">
        <div className="min-w-fit">
          <Table<IGetSupplierProduct>
            columns={columns}
            // className="text-xs"
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
