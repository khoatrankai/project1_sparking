"use client";
import { toggleMenu } from "@/redux/store/slices/menu.slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { Avatar } from "antd";
import Image from "next/image";
import React from "react";
import { FaUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// type Props = {};

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { datas: dataProfile } = useSelector(
    (state: RootState) => state.get_profile
  );
  return (
    <div className="h-16 z-50 relative">
      <div className="h-16 bg-white px-4 flex justify-between items-center fixed inset-x-0 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
        <div className="flex items-center gap-2 h-full">
          <IoMenu
            className="h-8 w-8 cursor-pointer"
            onClick={() => {
              dispatch(toggleMenu());
            }}
          />
          <Image alt="" src={"/logo.png"} height={40} width={140} />
        </div>
        {dataProfile ? (
          <>
            <Avatar alt="" src={dataProfile.picture_url} className="w-8 h-8" />
          </>
        ) : (
          <div className="rounded-full bg-[#00A9AE] w-fit h-fit p-2">
            <FaUser className="text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
