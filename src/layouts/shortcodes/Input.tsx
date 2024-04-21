"use client";

import React from "react";
import { FaEye } from "react-icons/fa";

const Input = ({
  value,
  placeholder,
  icon,
  type,
  onChange,
}: {
  value: any;
  placeholder: string | any;
  icon: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

}) => {
  return (
    <>
      <div className="w-full mb-4 md:mb-3 grid  gap-2">

        <div className="w-full flex items-center rounded relative">
          <input type={type} placeholder={placeholder} className="border bg-[#fbfcfd] border-[#9ab0f1] rounded-md px-3 py-4 md:py-2 placeholder-gray-400 text-black w-full focus:outline-none focus:border-black" onChange={onChange} />
          <FaEye style={{ display: icon }} className=" absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-300 cursor-pointer transition duration-300 hover:text-white" />
        </div>
      </div>
    </>
  );
};

export default Input;
