import { IGetOpportunitiesDto } from "@/models/opportunityInterface"; // Updated import
import { Button, Dropdown, Select, Table, TableColumnsType } from "antd";
import Search from "antd/es/input/Search";
import { TableRowSelection } from "antd/es/table/interface";
import React, { useEffect, useState } from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import usePostData from "@/hooks/usePostData";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import ModalUpdateOpportunity from "../Tool/ModalOpportunity/ModalUpdateOpportunity";

export default function ListOpportunities() {
  const { postdata } = usePostData();
  const dispatch = useDispatch<AppDispatch>();

  const { datas: dataSource } = useSelector(
    (state: RootState) => state.get_opportunities
  );

  const [pageLimit, setPageLimit] = useState<number>(25);
  const [dataFilter, setDataFilter] = useState<IGetOpportunitiesDto[] | []>();

  const columns: TableColumnsType<IGetOpportunitiesDto> = [
    {
      title: "#",
      className: "text-xl",
      dataIndex: "opportunity_id",
      render: (value: string, record, index) => (
        <div className="flex flex-col gap-1">
          <strong>
            #{index + 1}.{`${value.slice(0, 10)}...`}
          </strong>
          <div className="flex gap-2">
            <Button type="text" ghost className="text-xl text-blue-600">
              View
            </Button>
            <ModalUpdateOpportunity ID={value} />
          </div>
        </div>
      ),
      sorter: (a, b) => a.opportunity_id.localeCompare(b.opportunity_id),
    },
    {
      title: "Tên liên hệ",
      className: "text-xl",
      dataIndex: "name_contact",
      render: (value: string | undefined) =>
        value && value.length > 15 ? `${value.slice(0, 15)}...` : value,
      sorter: (a, b) =>
        (a.name_contact || "").localeCompare(b.name_contact || ""),
    },
    {
      title: "Công ty",
      className: "text-xl",
      dataIndex: "company_name",
      sorter: (a, b) =>
        (a.company_name || "").localeCompare(b.company_name || ""),
      render: (value) => <>{value}</>,
    },
    {
      title: "Email",
      className: "text-xl",
      dataIndex: "email",
      sorter: (a, b) =>
        (a.company_name || "").localeCompare(b.company_name || ""),
      render: (value) => <>{value}</>,
    },
    {
      title: "Số điện thoại",
      className: "text-xl",
      dataIndex: "phone_number",
      sorter: (a, b) =>
        (a.company_name || "").localeCompare(b.company_name || ""),
      render: (value) => <>{value}</>,
    },
    {
      title: "Nhân viên hỗ trợ",
      className: "text-xl",
      dataIndex: ["user_support"], // Specify the main object to access nested properties
      sorter: (a, b) =>
        (a.user_support?.last_name || "").localeCompare(
          b.user_support?.last_name || ""
        ),
      render: (user) => (
        <>
          {user?.first_name} {user?.last_name}
        </>
      ),
    },

    {
      title: "Tình trạng",
      className: "text-xl",
      dataIndex: ["type_opportunity", "name"],
      sorter: (a, b) =>
        (a.company_name || "").localeCompare(b.company_name || ""),
      render: (value) => <strong>{value}</strong>,
    },
    {
      title: "Nguồn cơ hội",
      className: "text-xl",
      dataIndex: ["type_source", "name"],
      sorter: (a, b) =>
        (a.company_name || "").localeCompare(b.company_name || ""),
      render: (value) => <>{value}</>,
    },

    {
      title: "Ngày tạo",
      className: "text-xl",
      dataIndex: "created_at",
      render: (value: Date) => new Date(value).toLocaleDateString("vi-VN"),
      sorter: (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    },
  ];

  useEffect(() => {
    setDataFilter(dataSource);
  }, [dataSource]);

  const handleSearchFilter = (value: string) => {
    setDataFilter(
      dataSource?.filter((dt) => {
        return String(
          dt.opportunity_id +
            " " +
            dt.name_contact +
            " " +
            dt.company_name +
            " " +
            dt.price
        )
          .toLowerCase()
          .includes(value.toLowerCase());
      })
    );
  };

  const rowSelection: TableRowSelection<IGetOpportunitiesDto> = {};

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
            onChange={(e) => handleSearchFilter(e.target.value)}
            placeholder="Search"
            style={{ width: 200 }}
          />
        </div>
      </div>
      <div className="w-full overflow-auto">
        <div className="min-w-fit">
          <Table<IGetOpportunitiesDto>
            columns={columns}
            rowSelection={rowSelection}
            dataSource={dataFilter}
            pagination={{
              pageSize: pageLimit,
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
