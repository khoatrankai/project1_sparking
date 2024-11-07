import usePostData from "@/hooks/usePostData";
import { CustomerInfo } from "@/models/customerInterface";
import customerService from "@/services/customerService";
import {
  Button,
  Dropdown,
  Select,
  Switch,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import Search from "antd/es/input/Search";
import { TableRowSelection } from "antd/es/table/interface";
import React, { useEffect, useState } from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import ModalUpdateCustomer from "../ToolCustomer/ModalCustomer/ModalUpdateCustomer";

type Props = {
  dataSource?: CustomerInfo[] | [];
};

export default function ListCustomer({ dataSource }: Props) {
  const [pageLimit, setPageLimit] = useState<number>(25);
  const [dataFilter, setDataFilter] = useState<CustomerInfo[] | [] | undefined>(
    dataSource
  );
  const { postdata } = usePostData();
  const columns: TableColumnsType<CustomerInfo> = [
    {
      title: "#",
      className: "text-xs",
      dataIndex: "info_id",
      render: (value: string, red, index) => (
        <div className="flex flex-col gap-1 ">
          <strong>
            #{index + 1}.{`${value.slice(0, 10)}...`}
          </strong>
          <div className="flex gap-2">
            <Button type="text" ghost className="text-xs text-blue-600">
              Xem
            </Button>
            <ModalUpdateCustomer info_id={value} />
          </div>
        </div>
      ),
      sorter: (a: CustomerInfo, b: CustomerInfo) =>
        a.info_id.localeCompare(b.info_id),
    },
    {
      title: "Tên khách hàng",
      className: "text-xs",
      dataIndex: "name_company",
      render: (value: string) => (
        <>{value.length > 15 ? `${value.slice(0, 15)}...` : value}</>
      ),
      sorter: (a: CustomerInfo, b: CustomerInfo) =>
        a.name_company.localeCompare(b.name_company),
    },
    {
      title: "Liên hệ chính",
      className: "text-xs",
      dataIndex: ["infoContacts", "0", "customer", "full_name"],
      render: (value: string) => (
        <>{value?.length > 15 ? `${value.slice(0, 15)}...` : value}</>
      ),
      sorter: (a: CustomerInfo, b: CustomerInfo) =>
        a.infoContacts[0].customer.full_name.localeCompare(
          b.infoContacts[0].customer.full_name
        ),
    },
    {
      title: "Email liên hệ",
      className: "text-xs",
      dataIndex: ["infoContacts", "0", "customer", "email"],

      sorter: (a: CustomerInfo, b: CustomerInfo) =>
        a.infoContacts[0].customer.email.localeCompare(
          b.infoContacts[0].customer.email
        ),
    },
    {
      title: "Điện thoại",
      className: "text-xs",
      dataIndex: "phone_number",
      sorter: (a: CustomerInfo, b: CustomerInfo) =>
        a.phone_number.localeCompare(b.phone_number),
    },
    {
      title: "Đang hoạt động",
      className: "text-xs",
      dataIndex: "status_active",
      render: (value, record) => (
        <>
          <Switch
            defaultChecked={value === "active"}
            onChange={(check) => {
              postdata(() =>
                customerService.updateStatusCustomer({
                  info_id: record.info_id,
                  status_active: check ? "active" : "inactive",
                })
              );
            }}
          />
        </>
      ),
    },
    {
      title: "Nhóm khách hàng",
      className: "text-xs",
      dataIndex: ["group_customer", "name_group"],
      sorter: (a: CustomerInfo, b: CustomerInfo) =>
        a.group_customer.name_group.localeCompare(b.group_customer.name_group),
      render: (value: string) => (
        <>
          <Tag color={"gray"}>
            {value.charAt(0).toUpperCase() + value.slice(1)} {/* {value} */}
            {/* Chuyển chữ cái đầu thành viết hoa */}
          </Tag>
        </>
      ),
    },
    {
      title: "Ngày tạo",
      className: "text-xs",
      dataIndex: "created_at",

      sorter: (a: CustomerInfo, b: CustomerInfo) =>
        a.created_at.localeCompare(b.created_at),
    },
  ];
  useEffect(() => {
    setDataFilter(dataSource);
  }, [dataSource]);

  const handleSearchFilter = (value: string) => {
    setDataFilter(
      dataSource?.filter((dt) => {
        return String(
          dt.info_id +
            " " +
            dt.created_at +
            " " +
            dt.name_company +
            " " +
            dt?.infoContacts[0]?.customer?.full_name +
            " " +
            dt?.infoContacts[0]?.customer?.email +
            " " +
            dt.phone_number
        )
          .toLowerCase()
          .includes(value.toLowerCase());
      })
    );
  };

  const rowSelection: TableRowSelection<CustomerInfo> = {};
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
          <Table<CustomerInfo>
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
