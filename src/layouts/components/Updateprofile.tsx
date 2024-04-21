"use client"
import ImageFallback from "@/helpers/ImageFallback";
import Input from "@/shortcodes/Input";
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useRouter } from "next/navigation";
import { auth, db } from '../../firebase-config';
import { onAuthStateChanged, updateProfile, User } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL, StorageReference } from 'firebase/storage';
import { toast } from "react-toastify";
import Icon from "./Icon";
import { TextSkeleton } from "./ReviewCard/HomeSkeleton";



interface ProfilePicEventTarget extends EventTarget {
  files: FileList;
}

interface ProfilePicEvent extends ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget & { files: FileList };
}


const UpdateProfile = () => {
  const [firebaseUserInfo, setFirebaseUserInfo] = useState<User | null>(auth.currentUser);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>();


  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setFirebaseUserInfo);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (firebaseUserInfo?.photoURL) {
      setPhotoURL(firebaseUserInfo.photoURL);
    }
  }, [firebaseUserInfo]);

  const email = firebaseUserInfo?.email
  const updateProfileInfo = async (e: FormEvent) => {
    e.preventDefault();
    try {

      const displayName = `${firstName} ${lastName}`;
      if (!firebaseUserInfo) return;

      // Update display name
      if (displayName) {
        await updateProfile(firebaseUserInfo, { displayName });
      }

      // Upload and update profile picture
      if (profilePic) {
        const userId = firebaseUserInfo.uid;
        const storage = getStorage();
        const fileRef: StorageReference = ref(storage, `${userId}/profilesPics`);
        setLoading(true);
        await uploadBytes(fileRef, profilePic);
        const url: string = await getDownloadURL(fileRef);
        setLoading(false);
        await updateProfile(firebaseUserInfo, { photoURL: url });
        toast.success("profile picture sucessfully updated")
      }

      // window.location.reload();
      toast.success("profile updated sucessfully")
    } catch (error) {
      console.error(error);
    }
  };


  const handleDisplayNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  const handleProfilePicChange = (e: ProfilePicEvent) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePic(e.target.files[0]);
    }
  };

  return (

     <form onSubmit={updateProfileInfo} className="w-full mb-14 px-0 md:px-4 mt-6 grid  md:bg-white">
     <div className="w-full flex my-2 justify-between">
       <div className="w-1/4 px-2 flex justify-center">
         <img src={photoURL || "/images/james.svg"} className="rounded-full h-[65px] w-[65px] object-cover" width={65} height={65} />
       </div>
       <div className="w-[75%] pr-4">
       <label className="w-full flex flex-col items-center px-4 py-6 bg-transparent hover:bg-[#ebebeb] text-blue rounded-lg  tracking-wide  border border-blue cursor-pointer hover:bg-blue hover:text-blue">
       <Icon icon="upload" width={35} height={35} fill="#aeb8c4" />
       <p className="mt-2 text-[12px] text-center leading-normal"> <span className="text-blue-500 font-semibold">Click to upload </span><br/> SVG, PNG, JPG or GIF</p>
       <input type="file" name="myImage" className="hidden" onChange={(e) => setProfilePic(e.target.files?.[0] || null)} id="input-file" />
   </label>
         
       </div>
     </div>
     <div className="w-full flex justify-between">
       <div className="w-1/2 px-4">
         <label className="text-[12px]">First Name</label>
         <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" icon="none" placeholder={firstName} />
       </div>
       <div className="w-1/2 px-4">
         <label className="text-[12px]">Last Name</label>
         <Input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" icon="none" placeholder={lastName} />
       </div>
     </div>

     <div className="w-full px-4">
       <label className="text-[12px]">Email Address</label>
       <div className="w-full mb-4 md:mb-3 grid  gap-2">

         <div className="w-full flex items-center rounded relative">
           <p className="border bg-[#ebebeb] border-[#9ab0f1] h-full rounded-md px-3 py-4 md:py-2 text-black w-full focus:outline-none focus:border-black" >{email || <TextSkeleton/>}</p>

         </div>
       </div>
     </div>

     <div className="w-full md:mt-2 flex px-4 justify-between">
       <button className="btn btn-primary uppercase bg-blue-500 text-white border-blue-500 w-[48%]" >Submit</button>
       <button className="btn btn-primary uppercase bg-transparent text-blue-500 border-blue-500 w-[48%]">Cancel</button>
     </div>
   </form>

  );
};

export default UpdateProfile;

