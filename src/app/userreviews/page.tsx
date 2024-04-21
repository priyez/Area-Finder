"use client"
import SeoMeta from "@/partials/SeoMeta";
import Link from "next/link";
import ImageFallback from "@/helpers/ImageFallback";
import Input from "@/shortcodes/Input";
import { useState } from "react";
import UpdateProfile from "@/components/Updateprofile";
import AccountIcon from "@/partials/AccountIcon";
import SideBar from "@/components/SideBar";
import AllReviews from "@/components/AllReviews";
import useAuthentication from "@/hooks/useAuthentication";
import { Logo } from "@/partials/Logo";



const UserReviews = () => {

 const loading = useAuthentication();

    if (loading) {
      return null; // Render nothing if authentication state is still being checked
    }
  
    return (

        <section className="section bg-[#fbfcfd] pt-4 fixed overflow-y-auto h-full  w-full">
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
                    <AllReviews />

                    </div>
                </div>
            </div>

        </section>



    );
};

export default UserReviews;


