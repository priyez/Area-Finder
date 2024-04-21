"use client"
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { LogOut } from "@/lib/utils/interfaces"
import { useRouter } from "next/navigation"
import { User } from "@/lib/utils/interfaces"
import ImageFallback from "@/helpers/ImageFallback";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase-config'
import useAuthentication from "@/hooks/useAuthentication";
import useProfilePic from "@/hooks/useProfilePic";


const AccountIcon = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const { profilePicInitial, backgroundColor } = useProfilePic(user?.email);
  const [dropMenu, setDropMenu] = useState(false)
  const isUserLoggedIn = useCallback(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ email: user.email, uid: user.uid, displayName: user.displayName, photoURL: user.photoURL });
     
      } else {
        return router.push("/");
      }
    });
  }, [router]);

  useEffect(() => {
    isUserLoggedIn();
  }, [isUserLoggedIn]);

  useAuthentication()

  useEffect(() => {
    if (user?.photoURL) {
      user.photoURL
    }
  }, [user]);

  return (
    <>
    
        <div className="inline-block text-[15px] font-bold" onClick={() => setDropMenu((prev) => !prev)}>
          {user?.photoURL && user?.photoURL === user?.photoURL ? (


            <div>
              Welcome!
              <ImageFallback src={user?.photoURL} className="mb-2 object-cover rounded-full mt-2 mr-2 ml-2 inline-block w-8 h-8 bg-black" width={30} height={30} alt="user" />
            </div>
          ) : (
            <div className="inline-flex">
              Welcome!
              <div className="rounded-full ml-2 flex items-center justify-center mb-2" style={{ width: '30px', height: '30px', backgroundColor }}>
                <span className="text-white font-bold">{profilePicInitial}</span>
              </div>
            </div>
          )}

        </div>
    
      {
        dropMenu &&
        <>
          <div onClick={() => setDropMenu((prev) => !prev)} className="fixed w-full left-0 h-full z-20" />
          <div className="h-auto fixed bg-white w-48 rounded-xl right-8 md:right-28 z-40 top-20 md:top-28 opacity-100">
            <ul className="text-center mt-6 md:mt-3 block px-2">
              <li className="flex px-2 py-3 md:py-2 text-[14px] border-b-[0.25px] border-gray-200">
                <Link href="/userprofile" className="flex items-center w-full text-gray-800 justify-between">
                  <p>Profile</p>

                </Link>
              </li>
              <li className="flex px-2 py-3 md:py-2 text-[14px] border-b-[0.25px] border-gray-200">
                <Link href="userreviews" className="flex items-center w-full text-gray-800 justify-between">
                  <p className="mt-0">Reviews</p>
                </Link>
              </li>
              <li className="flex px-2 py-3 md:py-2 text-[14px] border-b-[0.25px] border-gray-200">
                <a href="#" className="flex items-center w-full text-gray-800 justify-between">
                  <p className="m-0">Settings</p>

                </a>
              </li>
              <li className="flex px-2 py-3 md:py-2 text-[14px]"  onClick={() => LogOut(router)}>
              <span className="flex items-center w-full text-gray-800 justify-between">
                  <p className="m-0">Log Out</p>

                </span>
              </li>
            </ul>
          </div>

        </>
      }
    </>
  );
};

export default AccountIcon;
