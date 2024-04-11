"use client"

import React, { useEffect, useState } from "react";
import { collection, onSnapshot, } from "firebase/firestore";
import { db } from "../../firebase-config";
import CreateReview from "@/components/CreateReview"
import Header from "@/partials/Header";
import { FaCommentAlt, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { ToastContainer } from "react-toastify";



import ImageFallback from "@/helpers/ImageFallback";


interface Review {
  id: string;
  location: string;
  options: string[];
  rating: number;
  review: string;
}

const ReviewsList: React.FC = () => {

  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [expandedReviewId, setExpandedReviewId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false)
  
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "reviews"), (snapshot) => {
      const reviewsData = snapshot.docs.map((doc) => ({ ...doc.data() as Review, id: doc.id }));
      setReviews(reviewsData);
      filterReviews(reviewsData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    filterReviews(reviews);
  }, [reviews, selectedOption, searchTerm]);

  const filterReviews = (reviewsData: Review[]) => {
    let filteredData = [...reviewsData];
    if (selectedOption) {
      filteredData = filteredData.filter((review) => review.options.includes(selectedOption));
    }
    if (searchTerm) {
      filteredData = filteredData.filter((review) => review.location.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    console.log(filteredData)
    setFilteredReviews(filteredData);
  };



  const toggleComment = (id: string) => {
    setExpandedReviewId((prevId) => (prevId === id ? "" : id));
  };
  return (
    <div>
      <Header
        logoSrc="/images/Logo.svg"
        username="James T"
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        setSelectedOption={setSelectedOption}
        toggleModal={toggleModal}
        filteredReviewsCount={filteredReviews.length}
      />
      <ToastContainer className="bg-[fbfcfd] " />
      {filteredReviews.length === 0 ? (
        <div className="flex justify-center h-[60vh]">
          <ImageFallback
            className=""
            src="/images/empty-state.svg"
            alt="state"
            width={180}
            height={180}
          />
        </div>
      ) : (

        <div className="container">

          <div className="row justify-center">
            <div className="lg:col-7 md:col-9 mb-8 text-start px-[6rem] pr-9 pl-9 md:pl-[6rem] py-[3rem]">

              <div>
                {filteredReviews.map((review, index) => (
                  <div className="border-solid border-gray-300 border-b-2">
                    <div onClick={() => toggleComment(review.id)} >
                      <ul className="mb-2 flex justify-between">
                        <li className="mr-4 inline-flex">
                          <div className="inline-flex text-[12px]">

                            <ImageFallback
                              className="mb-2 bg-slate-600 rounded-full mt-4 mr-2 inline-block"
                              src="/images/james.svg"
                              alt="Dp"
                              width={25}
                              height={25}
                            />

                            <p className="text-[12px] ml-1 mt-[1.25rem]" >James T</p>
                            <p className="text-[10px] ml-4 mt-[1.35rem]" >5 minutes ago</p>
                          </div>

                        </li>
                        <li className="ml-[2.5rem] inline-block">
                          <div>
                            <p className="text-[12px] mt-[1.25rem] flex" > <FaStar color="yellow" size={12} className={"mt-[0.15rem] mr-1 inline-block"} />{review.rating}.0</p>
                          </div>


                        </li>

                      </ul>

                      <p className="mb-0 text-[13px] leading-[1.20rem]">
                        {review.review}
                      </p>
                      <ul className="mb-3">
                        <li className="mr-2 inline-block text-[10px]">
                          <FaThumbsUp className={"-mt-1 mr-1 inline-block"} />
                          600
                        </li>
                        <li className="mr-2 inline-block text-[10px]">
                          <FaThumbsDown className={"-mt-1 mr-1 inline-block"} />
                          100
                        </li>
                        <li className="mr-4 inline-block  text-[10px]">
                          <FaCommentAlt className={"-mt-1 mr-1 inline-block"} />
                          103
                        </li>
                        <li className="inline-block ml-[22.5rem]">

                        </li>
                      </ul>
                    </div>
                    {expandedReviewId === review.id && (
                      <div className="my-2 border-solid border-gray-300 border-t-2">
                        <ul className="my-3">
                          <li className="mr-10 w-[72%] md:w-[76%]  inline-block text-[10px]">
                            <input placeholder="Write a comment"
                              className="searchInput border-none border-b border-gray-400 px-2 w-full md:px-4 py-1"
                              type="input"

                            />
                          </li>
                          <li className="inline-block ml-[0.5rem] leading-10 uppercase text-white md:leading-8 md:ml-[1.5rem] text-[9px] w-[50px] md:w-[60px] h-[28px] md:h-[30px] rounded-[5px] items-center text-center bg-[#3265fc]">
                            post
                          </li>
                        </ul>

                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-5 hidden md:block px-[3.5rem] py-[3rem] pl-0 relative">

              <div className="rowH  w-[92%] px-[1px]">
                {filteredReviews.length === 0 ? (
                  <div className="container">
                    {/* Your content for no search results */}
                  </div>
                ) : searchTerm === "Block C4, NNPC Housing Estate, Akpajo Eleme" ? (
                  <>

                    <div className="mb-4 md:col-6">
                      <img className="bg-[#6b2855] h-44 px-0 py-0 pt-0 object-cover w-full rounded-lg" src="/images/image2.svg" alt="" />

                    </div>
                    <div className="mb-4 md:col-6">
                      <img className="bg-[#6b2855] h-44 px-0 py-0 pt-0 object-cover w-full rounded-lg" src="/images/image2.svg" alt="" />

                    </div>
                    <div className="mb-4 md:col-6">
                      <img className="bg-[#6b2855] h-44 px-0 py-0 pt-0 object-cover w-full rounded-lg" src="/images/image3.svg" alt="" />

                    </div>
                    <div className="mb-4 md:col-6">
                      <img className="bg-[#6b2855] h-44 px-0 py-0 pt-0 object-cover w-full rounded-lg" src="/images/image1.svg" alt="" />

                    </div>
                  </>
                ) : searchTerm === "First Mechanic, Alakahia" ? (
                  <>

                    <div className="mb-4 md:col-6">
                      <img className="bg-[#6b2855] h-44 px-0 py-0 pt-0 object-cover w-full rounded-lg" src="/images/image3.svg" alt="" />

                    </div>
                    <div className="mb-4 md:col-6">
                      <img className="bg-[#6b2855] h-44 px-0 py-0 pt-0 object-cover w-full rounded-lg" src="/images/image2.svg" alt="" />

                    </div>
                    <div className="mb-4 md:col-6">
                      <img className="bg-[#6b2855] h-44 px-0 py-0 pt-0 object-cover w-full rounded-lg" src="/images/image3.svg" alt="" />

                    </div>
                    <div className="mb-4 md:col-6">
                      <img className="bg-[#6b2855] h-44 px-0 py-0 pt-0 object-cover w-full rounded-lg" src="/images/image1.svg" alt="" />

                    </div>
                  </>
                ) : (
                  <>

                    <div className="mb-4 md:col-6">
                      <img className="bg-[#6b2855] h-44 px-0 py-0 pt-0 object-cover w-full rounded-lg" src="/images/image1.svg" alt="" />

                    </div>
                    <div className="mb-4 md:col-6">
                      <img className="bg-[#6b2855] h-44 px-0 py-0 pt-0 object-cover w-full rounded-lg" src="/images/image2.svg" alt="" />

                    </div>
                    <div className="mb-4 md:col-6">
                      <img className="bg-[#6b2855] h-44 px-0 py-0 pt-0 object-cover w-full rounded-lg" src="/images/image3.svg" alt="" />

                    </div>
                    <div className="mb-4 md:col-6">
                      <img className="bg-[#6b2855] h-44 px-0 py-0 pt-0 object-cover w-full rounded-lg" src="/images/image2.svg" alt="" />

                    </div>
                  </>



                )
                }
              </div>
            </div>
          </div>

        </div>

      )}

      {isOpen && (
        <CreateReview
          closeModal={closeModal}
        />

      )}
    </div>
  );
};

export default ReviewsList;

