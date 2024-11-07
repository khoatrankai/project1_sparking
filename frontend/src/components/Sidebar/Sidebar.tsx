import { Menu, MenuProps } from "antd";
import Link from "next/link";
import React from "react";
import { FaUser, FaUserTie } from "react-icons/fa";
import { TbZoomMoney } from "react-icons/tb";

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
      key: "sale",
      label: "Bán hàng",
      icon: <TbZoomMoney />,
      children: [
        {
          key: "propose",
          label: (
            <Link href="/admin/propose">
              <span>Đề xuất</span>
            </Link>
          ),
        },
        { key: "price_quote", label: "Báo giá" },
        { key: "invoice", label: "Hóa đơn" },
        { key: "contract", label: "Hợp đồng" },
        {
          key: "product",
          label: (
            <Link href="/admin/product">
              <span>Danh sách sản phẩm</span>
            </Link>
          ),
        },
      ],
    },
    {
      key: "user",
      label: "Nhân viên",
      icon: <FaUser />,
      children: [{ key: "users", label: "Danh sách nhân viên" }],
    },
  ];
  return (
    <div className="w-52 bg-[#1BA399] h-full fixed bottom-0 left-0 top-16 overflow-y-auto py-4">
      <Menu
        //   onClick={onClick}
        className="bg-[#1BA399]"
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
