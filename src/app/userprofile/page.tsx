"use client"
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import UpdateProfile from "@/components/Updateprofile";
import AccountIcon from "@/partials/AccountIcon";
import SideBar from "@/components/SideBar";
import useAuthentication from "@/hooks/useAuthentication";
import { Logo } from "@/partials/Logo";



const UserProfile = () => {
    const loading = useAuthentication();

    if (loading) {
      return null; 
    }
    return (

        <section className="section bg-[#fbfcfd] pt-4 fixed overflow-y-auto h-full  w-full">
         <ToastContainer className="bg-[fbfcfd] " />
            <div className="home-header bg-[#fbfcfd] header absolute w-full z-40  px-4 md:px-12 top-0"
            >
                <nav className="navbar container text-[12px]">

                    <Logo/>
                    <ul>
                        <li>
                            <AccountIcon />
                        </li>
                    </ul>

                </nav>
            </div>
            <div className="container">
                <div className="block md:row justify-center">

                    <SideBar />
                    <div className="lg:col-10 md:bg-[#ffffff82]  md:block md:px-[3.5rem] py-[3rem] pl-0 relative">

                        <div className="my-16 md:my-8">
                            <div className="px-4 md:px-[17rem] md:pt-10">
                                <h4 className="text-[22px]">User Profile</h4>
                                <p className="text-[12px]">Update your personal details here</p>
                            </div>
                            <div id="profile" className="w-full px-1 mt-32 md:mt-16 md:px-64" >

                                <UpdateProfile />

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </section>



    );
};

export default UserProfile;


