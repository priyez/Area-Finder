"use client"

import React from "react"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Reactions from "@/components/Reactions";


export const ReviewCardSkeleton = () => {

  return (

   <>
 {Array.from({length: 5},(_, i) => i + 1).map((id) => (
    <div key={id} className="border-solid border-gray-300 border-b-2 mb-3 px-4 py-2">
    <div>
      <ul className="mb-2 flex justify-between">
        <li className="mr-4 inline-flex">
          <div className="inline-flex text-[12px]">
            <Skeleton circle width={35} height={35} />
            <Skeleton width={80} height={15} className="ml-1 mt-[1.25rem]" />
            <Skeleton width={60} height={12} className="ml-4 mt-[1.35rem]" />
          </div>
        </li>
        <li className="ml-[2.5rem] inline-block">
          <div>
            <Skeleton width={50} height={15} className="mt-[1.25rem] flex" />
          </div>
        </li>
      </ul>
      <Skeleton height={15}/>
      <Skeleton height={15}/>
      <Skeleton height={15}/>
      <Skeleton width={250} height={15}/>
    </div>
    <ul className="h-8 my-2 mb-0">
      <li className="mr-4 inline-flex text-[10px]">
        <button className="mr-1">
          <Skeleton width={20} height={20} />
        </button>
        <Skeleton width={30} height={20} />
      </li>
      <li className="mr-7 inline-flex text-[10px]">
        <button className="mr-2">
          <Skeleton width={20} height={20} />
        </button>
        <Skeleton width={30} height={20} />
      </li>
      <li className="mr-4 inline-flex text-[10px]">
        <button className="mr-2">
          <Skeleton width={18} height={20} />
        </button>
        <Skeleton width={30} height={20} />
      </li>
      <li className="inline-block ml-[22.5rem]">
    
      </li>
    </ul>
  </div>
            )
            )}
        </>
  );
};


export const AllReviewsSkeleton = () => {

    return (
        <>
        {Array.from({length: 6},(_, i) => i + 1).map((id) => (
     <div key={id} className="mb-4 md:col-6">
      <ul className="mb-2 flex justify-normal">
        <li className="inline-block">
          <div className="w-[20px] inline-block">
            <Skeleton height={30} width={30} />
          </div>
        </li>
        <li className="ml-1 inline-block mt-3">
          <div className="inline-block py-2 px-4 text-[12px]">
            <Skeleton height={20} width={250} />
            <Skeleton height={20} width={50} />
            <Skeleton height={40} width={300} />
          </div>
        </li>
      </ul>
    </div>
      ) )}
       </>
    );
  };


  export const SideBarImagesSkeleton = () => {

    return (
        <div className="rowH w-[92%] px-[1px]">
        {Array.from({length: 6},(_, i) => i + 1).map((id) => (
            <div key={id}  className="mb-4 md:col-6">
          <Skeleton height={176} width={"100%"} />
            </div>
         ) )}
         </div>
    );
  };


export const TextSkeleton = () => {

    return (
      <Skeleton height={20} />
    );
  };
  export const H1Skeleton = () => {

    return (
      <Skeleton height={10} />
    );
  };
  export const ProfilePicSkeleton = () => {

    return (
      <Skeleton height={30} width={20} circle={true}  />
    );
  };

