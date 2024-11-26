import { IGetWork } from "@/models/activityInterface";
import { RootState } from "@/redux/store/store";
import { Button, Dropdown, Select, Table, TableColumnsType } from "antd";
import Search from "antd/es/input/Search";
import { TableRowSelection } from "antd/es/table/interface";
import React, { useEffect, useState } from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import { useSelector } from "react-redux";
import ModalUpdateWork from "../Tool/Modal/ModalUpdateWork/ModalUpdateWork";

export default function ListActivity() {
  const [pageLimit, setPageLimit] = useState<number>(25);
  const { datas: dataSources } = useSelector(
    (state: RootState) => state.get_works
  );
  const [dataFilter, setDataFilter] = useState<IGetWork[] | [] | undefined>([]);
  const columns: TableColumnsType<IGetWork> = [
    {
      title: "#",
      className: "text-xs",
      dataIndex: "work_id",
      render: (value: string, red, index) => (
        <div className="flex flex-col gap-1 ">
          <strong>
            #{index + 1}.{`${value.slice(0, 10)}...`}
          </strong>
          <div className="flex gap-2">
            <Button type="text" ghost className="text-xs text-blue-600">
              Xem
            </Button>
            <ModalUpdateWork ID={value} />
          </div>
        </div>
      ),
      sorter: (a: IGetWork, b: IGetWork) => a.work_id.localeCompare(b.work_id),
    },

    {
      title: "Tên công việc",
      dataIndex: "name",
      className: "text-xs",
      render: (value?: string) => value || "N/A",
      sorter: (a: IGetWork, b: IGetWork) =>
        (a.name || "").localeCompare(b.name || ""),
    },
    {
      title: "Hoạt động",
      dataIndex: ["activity", "name"],
      className: "text-xs",
      render: (value?: number) => (value ? `${value}` : "N/A"),
      sorter: (a: IGetWork, b: IGetWork) =>
        (a.activity?.name || "").localeCompare(b.activity?.name || ""),
    },
    {
      title: "Loại công việc",
      dataIndex: ["type", "name"],
      className: "text-xs",
      render: (value) => value || "N/A",
      sorter: (a: IGetWork, b: IGetWork) =>
        (a.type?.name || "").localeCompare(b.type?.name || ""),
    },
    {
      title: "Tình trạng",
      dataIndex: ["status", "name"],
      className: "text-xs",
      render: (value?: string) => value || "N/A",
      sorter: (a: IGetWork, b: IGetWork) =>
        (a.status?.name || "").localeCompare(b.status?.name || ""),
    },

    {
      title: "Ngày bắt đầu",
      dataIndex: "time_start",
      className: "text-xs",
      render: (value?: Date) =>
        value ? new Date(value).toLocaleDateString("vi-VN") : "N/A",
      sorter: (a: IGetWork, b: IGetWork) =>
        new Date(a.time_start || 0).getTime() -
        new Date(b.time_start || 0).getTime(),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "time_end",
      className: "text-xs",
      render: (value?: Date) =>
        value ? new Date(value).toLocaleDateString("vi-VN") : "N/A",
      sorter: (a: IGetWork, b: IGetWork) =>
        new Date(a.time_end || 0).getTime() -
        new Date(b.time_end || 0).getTime(),
    },
  ];
  useEffect(() => {
    setDataFilter(dataSources);
  }, [dataSources]);

  const handleSearchFilter = (value: string) => {
    setDataFilter(
      dataSources?.filter((dt) => {
        return String(
          dt.created_at +
            " " +
            dt.name +
            " " +
            dt.activity?.name +
            " " +
            dt.time_start +
            " " +
            dt.time_end +
            " " +
            dt.status.name
        )
          .toLowerCase()
          .includes(value.toLowerCase());
      })
    );
  };

  const rowSelection: TableRowSelection<IGetWork> = {};
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
          <Table<IGetWork>
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
