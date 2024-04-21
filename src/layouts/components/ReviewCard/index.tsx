"use client"

import React from "react"
import { FaStar } from "react-icons/fa";

import ImageFallback from "@/helpers/ImageFallback";
import Reactions from "@/components/Reactions";
import useTimeAgo from "@/hooks/useTimeAgo";


interface Reviews {
  id: string;
  location: string;
  options: string[];
  rating: number;
  review: string;
  user: {
    email: string;
    uid: string;
    displayName: string;
    photoURL : string;
  };
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };

}


const ReviewCard: React.FC<{review: any, expandedReviewId: any, timestamp: any,  toggleComment: any }> = ({ review, expandedReviewId, timestamp, toggleComment }) => {
//   const timeAgo = useTimeAgo(review.timestamp && review.timestamp?.seconds);
// console.log(timeAgo)
  return (

   
                  <div key={review.id} className="border-solid border-gray-300 border-b-2">
                    <div  >
                      <ul className="mb-2 flex justify-between">
                        <li className="mr-4 inline-flex">
                          <div className="inline-flex text-[12px]">

                            <ImageFallback
                              className="mb-2 bg-slate-600 rounded-full w-[25px] h-[25px] object-cover mt-4 mr-2 inline-block"
                              src={review.user && review.user.photoURL || "images/james.svg"}
                              alt="Dp"
                              width={25}
                              height={25}                           />

                            <p className="text-[12px] ml-1 mt-[1.25rem]" >{review.user && review.user.displayName || "Anonymous"}</p>
                            <p className="text-[10px] ml-4 mt-[1.35rem]" >{useTimeAgo(review.timestamp && review.timestamp?.seconds)}</p>
                          </div>

                        </li>
                        <li className="ml-[2.5rem] inline-block">
                          <div>
                            <p className="text-[12px] mt-[1.25rem] flex" > <FaStar color="yellow" size={12} className={"mt-[0.15rem] mr-1 inline-block"} />{review.rating}.0</p>
                          </div>


                        </li>

                      </ul>

                      <p className="mb-0 text-[13px] leading-[1.20rem]" onClick={() => toggleComment(review.id)}>
                        {review.review}
                      </p>
   
                    </div>
                    {/* {expandedReviewId === review.id && ( */}
                     <Reactions upvotes={[]} userReview={review}  expandedReviewId={expandedReviewId} review={review} downvotes={[]}  id={review.id}/>
                    {/* )} */}
                  </div>
            
  );
};


export default ReviewCard;