"use client";

import React from "react";
import { FaSearch } from "react-icons/fa";

const Search =  ({
  value,
  placeholder,
  onChange,
}: {
  value: any;
  placeholder:string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

}) => {
  return (
    <div  className="mb-6 w-full">
        <span className="relative top-9 md:top-[1.75rem] mb-1 inset-y-0  pl-3 flex items-center">
      <FaSearch />
      </span>
   <input placeholder={placeholder}
            className="searchInput px-7 w-full md:px-9 py-2"
            type="input"
            value={value}
            onChange={onChange}
             />
    </div>
  );
};

export default Search;
