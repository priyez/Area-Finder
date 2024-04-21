"use client"

import ImageFallback from "@/helpers/ImageFallback";
import useTimeAgo from "@/hooks/useTimeAgo";
import React from "react"
import { H1Skeleton, ProfilePicSkeleton, TextSkeleton } from "./HomeSkeleton";

interface Comment {
   
    createdAt: {
      seconds: number;
      nanoseconds: number;
    };
  
  }
  

const Comments: React.FC<{ currentlyLoggedinUser: any, createdAt: any, commentId: any, comment: string, userName: string, displayPic: string, user: string }> = ({ commentId, comment, userName, displayPic, createdAt, currentlyLoggedinUser, user }) => {


    return (


        <div>
            <div key={commentId}>
                <ul className="mb-2 flex justify-normal">
                    <li className="inline-block">
                        <div className="w-[35px] inline-block">

                            <ImageFallback
                                className="mb-2 bg-slate-600 rounded-full object-cover w-[35px] h-[35px] mt-4 mr-2 inline-block"
                                src={displayPic || "images/james.svg" || <ProfilePicSkeleton/>}
                                alt="Dp"
                                width={35}
                                height={35} />



                        </div>

                    </li>
                    <li className="ml-1 inline-block mt-3">

                        <div className="inline-block rounded-[12px] py-2 px-4 text-[12px]">


                            <p className="text-[12px] ml-1  uppercase" >{userName || <H1Skeleton/>}</p>
                            <p className="text-[12px] mt-[0.25rem] font-semibold flex" > {comment || <TextSkeleton/>}</p>
                            <p className="text-[10px] mt-[0.25rem] uppercase inline-flex" >&mdash; {useTimeAgo(createdAt.seconds)}</p>
                        </div>

                    </li>

                </ul>
             
            </div>
            <div className="col-1">
                {currentlyLoggedinUser && user === currentlyLoggedinUser.uid && (
                    <div>

                    </div>
                    // <i
                    //   className="fa fa-times"
                    //   style={{ cursor: "pointer" }}
                    //   onClick={() => handleDeleteComment({ commentId, user, comment, userName , createdAt})}
                    // ></i>
                )}
            </div>
        </div>



    );
};


export default Comments;







