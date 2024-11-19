import { Menu, MenuProps } from "antd";
import Link from "next/link";
import React from "react";
import { FaUser, FaUserTie } from "react-icons/fa";
import { TbActivityHeartbeat, TbZoomMoney } from "react-icons/tb";
import { PiProjectorScreenChartFill } from "react-icons/pi";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { LuContainer } from "react-icons/lu";

// type Props = {};

type MenuItem = Required<MenuProps>["items"][number];

const Sidebar = () => {
  const itemsMenu: MenuItem[] = [
    {
      key: "customer",
      label: (
        <Link href="/admin/customer">
          <span>Khách hàng</span>
        </Link>
      ),
      icon: <FaUserTie />,
    },
    {
      key: "project",
      label: "Dự án",
      icon: <PiProjectorScreenChartFill />,
      children: [
        {
          key: "list_project",
          label: (
            <Link href="/admin/project">
              <span>Danh sách dự án</span>
            </Link>
          ),
        },
      ],
    },
    {
      key: "sale",
      label: "Bán hàng",
      icon: <TbZoomMoney />,
      children: [
        { key: "price_quote", label: "Báo giá" },
        { key: "contract", label: "Hợp đồng" },
        {
          key: "propose",
          label: (
            <Link href="/admin/propose">
              <span>Đề xuất</span>
            </Link>
          ),
        },

        { key: "invoice", label: "Hóa đơn" },
        { key: "payment", label: "Thanh toán" },
      ],
    },
    {
      key: "user",
      label: "Nhân viên",
      icon: <FaUser />,
      children: [{ key: "users", label: "Danh sách nhân viên" }],
    },
    {
      key: "opportunity",
      label: "Cơ hội",
      icon: <AiOutlineFundProjectionScreen />,
      children: [
        {
          key: "list_opportunity",
          label: (
            <Link href="/admin/opportunity">
              <span>Danh sách cơ hội</span>
            </Link>
          ),
        },
      ],
    },

    {
      key: "activity",
      label: "Hoạt động",
      icon: <TbActivityHeartbeat />,
      children: [
        {
          key: "list_activity",
          label: (
            <Link href="/admin/activity">
              <span>Danh sách hoạt động</span>
            </Link>
          ),
        },
        {
          key: "activity_require",
          label: (
            <Link href="/admin/activity/require">
              <span>Yêu cầu khách hàng</span>
            </Link>
          ),
        },
        {
          key: "activity_work",
          label: (
            <Link href="/admin/activity/work">
              <span>Danh sách công việc</span>
            </Link>
          ),
        },
        {
          key: "activity_schedule",
          label: (
            <Link href="/admin/activity/schedule">
              <span>Lịch trình</span>
            </Link>
          ),
        },
      ],
    },
    {
      key: "container",
      label: "Kho hàng",
      icon: <LuContainer />,
      children: [
        {
          key: "list_product",
          label: (
            <Link href="/admin/product">
              <span>Danh sách sản phẩm</span>
            </Link>
          ),
        },
        {
          key: "list_product_input",
          label: (
            <Link href="/admin/product/input">
              <span>Nhập kho</span>
            </Link>
          ),
        },
        {
          key: "list_product_output",
          label: (
            <Link href="/admin/product/output">
              <span>Xuất kho</span>
            </Link>
          ),
        },
      ],
    },
  ];
  return (
    <div className="w-52 bg-[#1A2A36] h-full fixed bottom-0 left-0 top-16 overflow-y-auto py-4">
      <Menu
        //   onClick={onClick}
        className="bg-[#1A2A36]"
        style={{ width: "100%" }}
        theme="dark"
        color="white"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={itemsMenu}
      />
    </div>
  );
};

export default Sidebar;
