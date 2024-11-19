import useFetchData from "@/hooks/useFetchData";
import { IGetPriceQuote } from "@/models/priceQuoteInterface";
import { Vat } from "@/models/systemInterface";
import { RootState } from "@/redux/store/store";
import systemService from "@/services/systemService";
import { Button, Dropdown, Select, Table, TableColumnsType, Tag } from "antd";
import Search from "antd/es/input/Search";
import { TableRowSelection } from "antd/es/table/interface";
import React, { useEffect, useState } from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import { useSelector } from "react-redux";
import ModalUpdatePriceQuote from "../Tool/Modal/ModalUpdatePriceQuote/ModalUpdatePriceQuote";

export default function ListPropose() {
  const { data: dataVats } = useFetchData<Vat[]>(systemService.getVats);
  const [pageLimit, setPageLimit] = useState<number>(25);
  const { datas: dataSources } = useSelector(
    (state: RootState) => state.get_price_quotes
  );
  const [dataFilter, setDataFilter] = useState<
    IGetPriceQuote[] | [] | undefined
  >([]);
  const columns: TableColumnsType<IGetPriceQuote> = [
    {
      title: "Báo giá#",
      className: "text-xs",
      dataIndex: "price_quote_id",
      render: (value: string, red, index) => (
        <div className="flex flex-col gap-1 ">
          <strong>
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
      sorter: (a: IGetPriceQuote, b: IGetPriceQuote) =>
        a.price_quote_id.localeCompare(b.price_quote_id),
    },
    {
      title: "Tổng cộng",
      className: "text-xs",
      dataIndex: "products",
      render: (value, record) => (
        <>
          {record.products
            .reduce((preValue, currValue) => {
              return currValue.quantity * currValue.price + preValue;
            }, 0)
            .toLocaleString("vi-VN")}
          đ
        </>
      ),
      sorter: (a: IGetPriceQuote, b: IGetPriceQuote) =>
        a.products.reduce((preValue, currValue) => {
          return currValue.quantity * currValue.price + preValue;
        }, 0) -
        b.products.reduce((preValue, currValue) => {
          return currValue.quantity * currValue.price + preValue;
        }, 0),
    },
    {
      title: "Tiền thuế",
      className: "text-xs",
      dataIndex: "products",
      render: (value, record) => (
        <>
          {(record.type_vat === "before"
            ? record.type_discount === "percent"
              ? record.products.reduce((preValue, currValue) => {
                  return (
                    ((currValue.price * currValue.quantity -
                      (currValue.price * currValue.quantity * record.discount) /
                        100) *
                      (dataVats?.find((dt) => dt.vat_id === currValue.vat)
                        ?.type_vat ?? 0)) /
                      100 +
                    preValue
                  );
                }, 0)
              : record.products.reduce((preValue, currValue) => {
                  return (
                    ((currValue.price * currValue.quantity -
                      ((currValue.price * currValue.quantity) /
                        record.products.reduce((preValue, currValue) => {
                          return (
                            currValue.quantity * currValue.price + preValue
                          );
                        }, 0)) *
                        record.discount) *
                      (dataVats?.find((dt) => dt.vat_id === currValue.vat)
                        ?.type_vat ?? 0)) /
                      100 +
                    preValue
                  );
                }, 0)
            : record.products.reduce((preValue, currValue) => {
                return (
                  (currValue.price *
                    currValue.quantity *
                    (dataVats?.find((dt) => dt.vat_id === currValue.vat)
                      ?.type_vat ?? 0)) /
                    100 +
                  preValue
                );
              }, 0)
          ).toLocaleString("vi-VN")}
          đ
        </>
      ),
      sorter: (a: IGetPriceQuote, b: IGetPriceQuote) =>
        (a.type_vat === "before"
          ? a.type_discount === "percent"
            ? a.products.reduce((preValue, currValue) => {
                return (
                  ((currValue.price * currValue.quantity -
                    (currValue.price * currValue.quantity * a.discount) / 100) *
                    (dataVats?.find((dt) => dt.vat_id === currValue.vat)
                      ?.type_vat ?? 0)) /
                    100 +
                  preValue
                );
              }, 0)
            : a.products.reduce((preValue, currValue) => {
                return (
                  ((currValue.price * currValue.quantity -
                    ((currValue.price * currValue.quantity) /
                      a.products.reduce((preValue, currValue) => {
                        return currValue.quantity * currValue.price + preValue;
                      }, 0)) *
                      a.discount) *
                    (dataVats?.find((dt) => dt.vat_id === currValue.vat)
                      ?.type_vat ?? 0)) /
                    100 +
                  preValue
                );
              }, 0)
          : a.products.reduce((preValue, currValue) => {
              return (
                (currValue.price *
                  currValue.quantity *
                  (dataVats?.find((dt) => dt.vat_id === currValue.vat)
                    ?.type_vat ?? 0)) /
                  100 +
                preValue
              );
            }, 0)) -
        (b.type_vat === "before"
          ? b.type_discount === "percent"
            ? b.products.reduce((preValue, currValue) => {
                return (
                  ((currValue.price * currValue.quantity -
                    (currValue.price * currValue.quantity * b.discount) / 100) *
                    (dataVats?.find((dt) => dt.vat_id === currValue.vat)
                      ?.type_vat ?? 0)) /
                    100 +
                  preValue
                );
              }, 0)
            : b.products.reduce((preValue, currValue) => {
                return (
                  ((currValue.price * currValue.quantity -
                    ((currValue.price * currValue.quantity) /
                      b.products.reduce((preValue, currValue) => {
                        return currValue.quantity * currValue.price + preValue;
                      }, 0)) *
                      b.discount) *
                    (dataVats?.find((dt) => dt.vat_id === currValue.vat)
                      ?.type_vat ?? 0)) /
                    100 +
                  preValue
                );
              }, 0)
          : b.products.reduce((preValue, currValue) => {
              return (
                (currValue.price *
                  currValue.quantity *
                  (dataVats?.find((dt) => dt.vat_id === currValue.vat)
                    ?.type_vat ?? 0)) /
                  100 +
                preValue
              );
            }, 0)),
    },
    {
      title: "Dự án",
      className: "text-xs",
      dataIndex: ["project", "name"],
      sorter: (a: IGetPriceQuote, b: IGetPriceQuote) =>
        (a.project.name ?? "").localeCompare(b.project.name ?? ""),
      render: (value) => {
        return `${value}`;
      },
    },
    {
      title: "Ngày báo giá",
      className: "text-xs",
      dataIndex: "date_start",
      sorter: (a: IGetPriceQuote, b: IGetPriceQuote) =>
        a.date_start.toString().localeCompare(b.date_start.toString()),
    },
    {
      title: "Ngày hết hạn",
      className: "text-xs",
      dataIndex: "date_expired",
      sorter: (a: IGetPriceQuote, b: IGetPriceQuote) =>
        a.date_expired.toString().localeCompare(b.date_expired.toString()),
    },
    {
      title: "Mã tham chiếu",
      className: "text-xs",
      dataIndex: "reference_code",
      sorter: (a: IGetPriceQuote, b: IGetPriceQuote) =>
        a.reference_code.localeCompare(b.reference_code),
    },
    {
      title: "Tình trạng",
      className: "text-xs",
      dataIndex: "status",
      render: (value: string) => (
        <>
          <Tag
            color={
              value === "draff"
                ? "gray"
                : value === "send"
                ? "lightblue"
                : value === "open"
                ? "blue"
                : value === "edit"
                ? "yellow"
                : value === "refuse"
                ? "red"
                : value === "accept"
                ? "green"
                : ""
            }
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}{" "}
            {/* Chuyển chữ cái đầu thành viết hoa */}
          </Tag>
        </>
      ),
      sorter: (a: IGetPriceQuote, b: IGetPriceQuote) =>
        a.status.localeCompare(b.status),
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
            dt.date_expired +
            " " +
            dt.date_start +
            " " +
            dt.project.name +
            " " +
            dt.price_quote_id +
            " " +
            dt.user_support.last_name +
            " " +
            dt.status
        )
          .toLowerCase()
          .includes(value.toLowerCase());
      })
    );
  };

  const rowSelection: TableRowSelection<IGetPriceQuote> = {};
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
          <Table<IGetPriceQuote>
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
