import { RootState } from "@/redux/store/store";
import {
  Avatar,
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
import { useSelector } from "react-redux";
import ModalUpdatePriceQuote from "../Tool/Modal/ModalUpdateUser/ModalUpdateUser";
import { InfoUser } from "@/models/userInterface";

export default function ListUser() {
  const [pageLimit, setPageLimit] = useState<number>(25);
  const { datas: dataSources } = useSelector(
    (state: RootState) => state.get_users
  );
  const [dataFilter, setDataFilter] = useState<InfoUser[] | [] | undefined>([]);
  const columns: TableColumnsType<InfoUser> = [
    {
      title: "#",
      className: "text-xs",
      dataIndex: "user_id",
      render: (value: string, red, index) => (
        <div className="flex flex-col gap-1 ">
          <strong className="flex gap-2 items-center">
            <span>
              <Avatar alt={red.last_name} src={red.picture_url} />
            </span>
            #{index + 1}.{`${value.slice(0, 10)}...`}
          </strong>
          <div className="flex gap-2">
            <Button type="text" ghost className="text-xs text-blue-600">
              Xem
            </Button>
            <ModalUpdatePriceQuote ID={value} />
          </div>
        </div>
      ),
      sorter: (a: InfoUser, b: InfoUser) => a.user_id.localeCompare(b.user_id),
    },
    {
      title: "Họ và tên",
      className: "text-xs",
      dataIndex: "",
      render: (value, record) => (
        <>
          {record.first_name} {record.last_name}
        </>
      ),
      sorter: (a: InfoUser, b: InfoUser) =>
        (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name),
    },
    {
      title: "Email",
      className: "text-xs",
      dataIndex: "email",
      render: (value) => <>{value}</>,
      sorter: (a: InfoUser, b: InfoUser) => a.email.localeCompare(b.email),
    },
    {
      title: "Số điện thoại",
      className: "text-xs",
      dataIndex: "phone_number",
      render: (value) => <>{value}</>,
      sorter: (a: InfoUser, b: InfoUser) =>
        a.phone_number.localeCompare(b.phone_number),
    },
    {
      title: "Trạng thái",
      className: "text-xs",
      dataIndex: "status",
      render: (value: string) => (
        <>
          <Switch
            defaultChecked={value === "active"}
            onChange={async () => {
              // const statusCode = await postdata(() =>
              //   productService.updateStatusProduct(
              //     record.product_id,
              //     check ? "active" : "hide"
              //   )
              // );
              // if (statusCode === 200) {
              //   dispatch(fetchProductAbout());
              // }
            }}
          />
        </>
      ),
      sorter: (a: InfoUser, b: InfoUser) => a.status.localeCompare(b.status),
    },
  ];
  useEffect(() => {
    setDataFilter(dataSources ?? []);
  }, [dataSources]);

  const handleSearchFilter = (value: string) => {
    setDataFilter(
      dataSources?.filter((dt) => {
        return String(
          dt.first_name +
            " " +
            dt.last_name +
            " " +
            dt.email +
            " " +
            dt.phone_number +
            dt.status
        )
          .toLowerCase()
          .includes(value.toLowerCase());
      })
    );
  };

  const rowSelection: TableRowSelection<InfoUser> = {};
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
          <Table<InfoUser>
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
