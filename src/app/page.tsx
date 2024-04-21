"use client"
import React, { useState, useCallback, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import SeoMeta from "@/partials/SeoMeta";
import { User } from "@/lib/utils/interfaces"
import Link from "next/link";
import ImageFallback from "@/helpers/ImageFallback";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import AccountIcon from "@/partials/AccountIcon";
import HomeReviewCard from "@/components/HomeReviewCard";
import { getReviewsData } from "@/lib/utils/interfaces"
import staticReviews from "../content/staticreviews.json"


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
    photoURL: string;
  };
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
  upVotesUsers?: string[] | any;
  downVotesUsers?: string[] | any;
  comment?: string[] | any;

}

export default function Home() {
  const [user, setUser] = useState<User>()
  const [reviews, setReviews] = useState<Reviews[]>([]);

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
    const fetchReviews = async () => {
      try {
        // Call the getReviewsData function to fetch reviews from Firestore
        const reviewsData = await getReviewsData();
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <>

      <SeoMeta />
      <section className="section bg-[#fbfcfd] pt-4 fixed h-full  w-full">
        <div className="home-header bg-[#fbfcfd] header absolute w-full z-40  px-4 md:px-12 top-0"
        >
          <nav className="navbar container  text-[12px]">
            {/* logo */}
            <div className="order-0">
              <ImageFallback src="/images/Logo.svg" className="mt-4" width={120} height={85} alt="Logo" />
            </div>
            <ul>
              <li>

                {user?.email === undefined ? (
                  <Link className="uppercase" href="/login">
                    Login
                  </Link>
                ) : (
                  <AccountIcon />
                )}


              </li>
            </ul>

          </nav>
        </div>
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-7 md:col-9 mb-8 text-start px-8 xl:px-[11rem] py-[15rem] md:py-[20rem] xl:py-[10rem]">
              <h1
                className="mb-4 text-h1  md:text-h1"> Find a Place you will love to live .</h1>
              <p
                className="mb-3 mr-[5rem]">See through th lenses of the people who have lived or visited the neigbourhood you might have in mind. </p>
              <div className="mb-4 md:mb-2 w-full">
                <span className="relative top-[2.25rem] mb-1 inset-y-0  pl-3 flex items-center">

                  <FaSearch size={15} />
                </span>
                <input placeholder="Enter an Address"
                  className="searchInput px-9 md:px-9 py-2"
                  type="input"
                />
              </div>

              <Link
                className="btn w-1/3 btn-primary uppercase"
                href="/review"
              >
                Search
              </Link>

            </div>
            <div className="lg:col-5 relative top-0  hidden xl:flex xl:top-[-10rem]">
              <ImageFallback src="/images/Overlay.svg" className="absolute right-[30px] z-20 top-36 flex w-[1225px]" height="100" width={100} alt="overlay" />
              <div className="rowH bg-[#fafcfd] w-[92%] px-[1px] ">
                <div className="absolute h-[125vh] left-0 bg-[#fbfcfd] dark:bg-darkmode-body w-[2.5%]" />
                <div className="absolute h-[125vh] right-0 bg-[#fbfcfd] dark:bg-darkmode-body w-[13%]" />
                {reviews.length === 0 ? (
                  <>
                  {
                    staticReviews.map((review: any, index: number) => (
                      <div key={index} className={`mb-4 md:col-6   ${index % 2 === 0 ? 'move-down' : 'move-up'} `}>
                        <HomeReviewCard review={review} index={index} />
                      </div>
                    ))
                  }
                  </>
                ) : (
                  <>
                    {reviews.map((review: any, index: number) => (
                      <div key={index} className={`mb-4 md:col-6   ${index % 2 === 0 ? 'move-down' : 'move-up'} `}>
                        <HomeReviewCard review={review} index={index} />
                      </div>
                    ))}
                  </>
                )
                }

              </div>
              {/* <ImageFallback src="/images/Overlay.svg" className="absolute z-20 overlay-bottom flex w-[1225px]" height="100" width={100} alt="ovelay" /> */}
            </div>
          </div>
        </div>

      </section>



    </>
  );
};

