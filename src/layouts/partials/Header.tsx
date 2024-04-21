"use client"
import React, { useState, useCallback, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth";
import ImageFallback from "@/helpers/ImageFallback";
import Search from "@/components/Search";
import Button from "@/shortcodes/Button";
import Link from "next/link";
import Icon from "@/components/Icon";
import Tab from "./Tab";
import { auth } from "../../firebase-config";
import AccountIcon from "./AccountIcon";
import {User } from "@/lib/utils/interfaces"



interface HeaderProps {
  logoSrc: string;
  username: string;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  setSelectedOption: (option: string) => void;
  toggleModal: () => void; 
  filteredReviewsCount: number;
}

const Header: React.FC<HeaderProps> = ({
  logoSrc,
  username,
  searchTerm,
  onSearchTermChange,
  setSelectedOption,
  toggleModal,
  filteredReviewsCount,
}) => {

  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [user, setUser] = useState<User>()

  const isUserLoggedIn = useCallback(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ email: user.email, uid: user.uid, displayName: user.displayName, photoURL: user.photoURL });
       
      } else {
        return null
      }
    });
  }, []);

  useEffect(() => {
    isUserLoggedIn();
  }, [isUserLoggedIn]);




  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  return (
    <header className={`w-full bg-[#F2F6FD] px-4 xl:px-12 ${isFixed ? 'fixed top-0 z-50' : ''}`}>
      <div className="home-header pb-0  relative w-full z-40 py-3 px-0 xl:px-12 top-0">
        <nav className="navbar container  text-[12px]">
        <Link href="/review" className="order-0">
            <ImageFallback src={logoSrc} className="mt-4" width={120} height={85}  alt="Logo"/>
          </Link>
         
          <div className="lg:flex hidden w-[65%] mt-4">
            <Search
              placeholder="Search by location..."
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
            />
          </div>

          <ul>
            <li className="inline-block mt-4 text-[15px] font-bold">
            {user === user ?  <AccountIcon  /> : 'Login'}
            </li>
          </ul>
        </nav>
      </div>
      {/* Mobile Search Bar */}
      <div className="lg:hidden block w-full px-2 mt-4">
        <Search
          placeholder="Search by location..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
      </div>
      {/* Mobile Search Bar */}
      <div className="home-header pt-0 pb-0 relative w-full z-20 py-3 px-0 xl:px-12 top-0">
        <nav className="navbar block lg:flex w-full container text-[12px]">
          <div className="order-0">
            <h4 className="text-[1.5rem]">{searchTerm === "" ? "Reviews" : searchTerm} </h4>
            <p>&quot;{filteredReviewsCount}&quot; Reviews (People are raving about the selected location)</p>
          </div>
          <ul className="flex w-full lg:w-[25%] justify-between">
            <li className="w-[60%] flex justify-center">
              <Button bgColor="#3265fc" width={"100%"} label="Leave Review" onClick={toggleModal} />
            </li>
            <li className="inline-block w-[15%] ml-2">
              <Button bgColor={"transparent"} width={"100%"} label={ <Icon icon="bookmark" width={26} height={26} fill="#aeb8c4" />} onClick />
            </li>
            <li className="inline-block w-[15%]">
              <Button bgColor={"transparent"}  width={"100%"} label={<Icon icon="share" width={23} height={23} fill="#aeb8c4" />} onClick />
            </li>
          </ul>
        </nav>
      </div>
     <Tab setSelectedOption={setSelectedOption}/>
    </header>
  );
};

export default Header;
