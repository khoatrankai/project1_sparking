import { Button, Tag } from "antd";
import React from "react";
import { FaChartPie } from "react-icons/fa";
import ModalAddActivity from "./Modal/ModalActivity";
import ModalTypeActivity from "./Modal/ModalTypeActivity/ModalTypeActivity";
import ModalStatusActivity from "./Modal/ModalStatusActivity/ModalStatusActivity";
import Link from "next/link";

// type MenuItem = {
//   value: string;
//   label: string;
// };

// const { RangePicker } = DatePicker;

export default function ToolActivity() {
  // const [filterData, setFilterData] = useState<FilterPriceQuote>({});

  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   if (filterData) {
  //     dispatch(fetchPriceQuotes(filterData));
  //   }
  // }, [filterData]);
  // // const { data: dataUsers } = useFetchData<InfoUser[]>(userService.getUsers);

  // const { datas: dataProjects } = useSelector(
  //   (state: RootState) => state.get_projects
  // );
  // const [itemProject, setItemProject] = useState<MenuItem[]>([]);

  // const itemsDate: MenuItem[] = [
  //   { value: "0", label: "Ngày đề xuất" },
  //   { value: "1", label: "Ngày hết hạn" },
  // ];
  // const itemsStatus: MenuItem[] = [
  //   { value: "draff", label: "Draff" },
  //   { value: "send", label: "Send" },
  //   { value: "open", label: "Open" },
  //   { value: "edit", label: "Edit" },
  //   { value: "refuse", label: "Refuse" },
  //   { value: "accept", label: "Accept" },
  // ];

  // useEffect(() => {
  //   if (dataProjects) {
  //     const customData =
  //       dataProjects.map((dt) => {
  //         return { value: dt.project_id, label: dt.name ?? "" };
  //       }) ?? [];
  //     setItemProject(customData);
  //   }
  // }, [dataProjects]);
  return (
    <div className="flex items-start gap-4 w-full flex-col">
      <div className="flex gap-2 items-center border-b-[1px] pb-4">
        {/* <Button
          className="bg-blue-400 border-0 text-white font-semibold"
          icon={<IoAddOutline />}
        >
          Thêm đề xuất
        </Button> */}
        <ModalAddActivity />
        <ModalTypeActivity />
        <ModalStatusActivity />
        <Link href={"/admin/activity/scheduler"}>
          <Button icon={<FaChartPie />} />
        </Link>
      </div>
      <div className="w-full">
        <h2 className="font-semibold text-[#1BA399]">Tổng quan khách hàng</h2>
        <div className="flex justify-around gap-2 flex-wrap">
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 border-0 shadow-lg shadow-black/20 bg-[#EB8823]">
            <p className="font-bold text-3xl text-white">
              {/* {dataAbout?.totalCustomer.toLocaleString("vi-VN")} */}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Tổng số khách hàng
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-[#EB8823] border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {/* {dataAbout?.totalActive.toLocaleString("vi-VN")} */}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Khách hàng đang hoạt động
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-[#EB8823] border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {/* {dataAbout?.totalInActive.toLocaleString("vi-VN")} */}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Khách hàng không hoạt động
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-[#EB8823] border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {/* {dataAbout?.contactActive.toLocaleString("vi-VN")} */}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Liên hệ đang hoạt động
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-[#EB8823] border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {/* {dataAbout?.contactInactive.toLocaleString("vi-VN")} */}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Liên hệ ít hoạt động
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-[#EB8823] border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {/* {dataAbout?.contactActiveToday.toLocaleString("vi-VN")} */}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Liên hệ đăng nhập hôm nay
            </p>
          </Tag>
        </div>
      </div>
      {/* <div className="flex flex-wrap w-full items-center justify-end gap-2 ">
        <Select
          placeholder="Dự án"
          style={{ minWidth: 120, flex: "1 1 0%" }}
          onChange={(e) => {
            setFilterData({ ...filterData, project: e });
          }}
          options={itemProject}
        />
        <Select
          placeholder="Ngày"
          style={{ minWidth: 120, flex: "1 1 0%" }}
          onChange={(e) => {
            setFilterData({ ...filterData, type_date: e });
          }}
          options={itemsDate}
        />

        <RangePicker
          style={{ minWidth: 120, flex: "1 1 0%" }}
          onChange={(e, values) => {
            console.log("thay doi", values);
            if (values[0] !== "") {
              setFilterData({
                ...filterData,
                date_start: values[0],
                date_expired: values[1],
              });
            } else {
              dispatch(fetchPriceQuotes({}));
            }
          }}
        />
        <Select
          placeholder="Tình trạng"
          onChange={(e) => {
            setFilterData({ ...filterData, status: e });
          }}
          style={{ minWidth: 120, flex: "1 1 0%" }}
          options={itemsStatus}
        />
        <Select
          placeholder="Người phụ trách"
          showSearch
          filterOption={(input, option) => {
            return (option?.children?.join("") ?? "")
              .toLowerCase()
              .includes(input.toLowerCase());
          }}
          onChange={(e) => {
            setFilterData({ ...filterData, user_support: e });
          }}
          style={{ minWidth: 120, flex: "1 1 0%" }}
        >
          {dataUsers?.map((dt) => (
            <Option key={dt.user_id} value={dt.user_id}>
              {dt.first_name} {dt.last_name}
            </Option>
          ))}
        </Select>
      </div> */}
    </div>
  );
}
