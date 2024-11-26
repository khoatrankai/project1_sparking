import { Button } from "antd";
import React from "react";
import { FaChartPie } from "react-icons/fa";
import ModalAddUser from "./Modal/ModalUser";

// type MenuItem = {
//   value: string;
//   label: string;
// };

// const { RangePicker } = DatePicker;

export default function ToolPriceQuote() {
  // const [filterData, setFilterData] = useState<FilterPriceQuote>({});

  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   if (filterData) {
  //     dispatch(fetchPriceQuotes(filterData));
  //   }
  // }, [filterData]);

  return (
    <div className="flex items-start gap-2 w-full flex-col">
      <div className="flex gap-1 items-center">
        {/* <Button
          className="bg-blue-400 border-0 text-white font-semibold"
          icon={<IoAddOutline />}
        >
          Thêm đề xuất
        </Button> */}
        <ModalAddUser />
        <Button icon={<FaChartPie />} />
      </div>

      <div className="flex flex-wrap w-full items-center justify-end gap-2 "></div>
    </div>
  );
}
