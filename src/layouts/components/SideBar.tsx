"use client"

import Link from "next/link";
import Icon from "./Icon";



const SideBar = () => {

  

    return (

                        <div className="lg:col-2 hidden md:flex md:col-9 mt-28 md:mt-16 px-5 md:mb-8 text-start md:px-[1.5rem] pr-9 pl-9 md:pl-[1.5rem] py-[3rem]">
                            <div className="w-full fixed">
                                <ul className="flex md:block justify-between">
                                    <li className="py-4 px-3">  <Link href="/userprofile"  className="inline-flex"> 
                                    <span className="mt-1 mx-2">
                                    <Icon icon="person" width={20} height={20} fill="#aeb8c4" /> 
                                    </span>
                                    Profile</Link></li>
                                    <li className="py-4 px-3">  <Link href="/userreviews"  className="inline-flex"> 
                                    <span className="mt-1 mx-2">
                                    <Icon icon="review" width={20} height={20} fill="#aeb8c4" /> 
                                    </span>
                                    Reviews</Link></li>
                                    <li className="py-4 px-3">  <Link href="/"  className="inline-flex"> 
                                    <span className="mt-1 mx-2">
                                    <Icon icon="settings" width={20} height={20} fill="#aeb8c4" /> 
                                    </span>
                                    Settings</Link></li>
                                    
                                </ul>
                            </div>
                        </div>
                       

    );
};

export default SideBar;


