import { Button, Tag } from "antd";
import React from "react";
import { FaChartPie } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store/store";
import ModalAddContract from "./Modal/ModalContract";
import ModalTypeContract from "./Modal/ModalTypeContract/ModalTypeContract";

// type MenuItem = {
//   value: string;
//   label: string;
// };

// const { RangePicker } = DatePicker;

export default function ToolContract() {
  // const [filterData, setFilterData] = useState<FilterPriceQuote>({});

  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   if (filterData) {
  //     dispatch(fetchPriceQuotes(filterData));
  //   }
  // }, [filterData]);
  // const { data: dataUsers } = useFetchData<InfoUser[]>(userService.getUsers);

  // const { datas: dataProjects } = useSelector(
  //   (state: RootState) => state.get_projects
  // );
  // const [itemProject, setItemProject] = useState<MenuItem[]>([]);

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
      <div className="flex gap-2 items-center border-b-[1px] pb-4 border-black/5">
        {/* <Button
          className="bg-blue-400 border-0 text-white font-semibold"
          icon={<IoAddOutline />}
        >
          Thêm đề xuất
        </Button> */}
        <ModalAddContract />
        <ModalTypeContract />
        <Button icon={<FaChartPie />} />
      </div>
      <div className="w-full">
        <h2 className="font-semibold text-[#1BA399]">Tổng quan hợp đồng</h2>
        <div className="flex justify-around gap-2 flex-wrap">
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 border-0 shadow-lg shadow-black/20 bg-[#EB8823]">
            <p className="font-bold text-3xl text-white">
              {/* {dataAbout?.totalCustomer.toLocaleString("vi-VN")} */}0
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Tổng số hợp đồng
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-[#EB8823] border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {/* {dataAbout?.totalActive.toLocaleString("vi-VN")} */}1
            </p>
            <p className="text-xs text-wrap text-slate-50/80">Đang hoạt động</p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-[#EB8823] border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {/* {dataAbout?.totalInActive.toLocaleString("vi-VN")} */}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">Sắp hết hạn</p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-[#EB8823] border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {/* {dataAbout?.contactActive.toLocaleString("vi-VN")} */}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">Hết hạn</p>
          </Tag>
          {/*<Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-[#EB8823] border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.contactInactive.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Liên hệ ít hoạt động
            </p>
          </Tag>
          <Tag className="lex flex-col pl-4 pt-8 rounded-lg gap-2 min-w-40 flex-1 h-32 bg-[#EB8823] border-0 shadow-lg  shadow-black/20">
            <p className="font-bold text-3xl text-white">
              {dataAbout?.contactActiveToday.toLocaleString("vi-VN")}
            </p>
            <p className="text-xs text-wrap text-slate-50/80">
              Liên hệ đăng nhập hôm nay
            </p>
          </Tag> */}
        </div>
      </div>
    </div>
  );
}
