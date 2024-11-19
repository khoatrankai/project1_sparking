import Image from "next/image";
import React from "react";
import { FaUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

// type Props = {};

const Header = () => {
  return (
    <div className="h-16 z-50 relative">
      <div className="h-16 bg-white px-4 flex justify-between items-center fixed inset-x-0">
        <div className="flex items-center gap-2 h-full">
          <IoMenu className="h-8 w-8" />
          <Image alt="" src={"/logo.png"} height={40} width={140} />
        </div>
        <div className="rounded-full bg-[#00A9AE] w-fit h-fit p-2">
          <FaUser className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default Header;
