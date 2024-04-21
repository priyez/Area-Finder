"use client"

import React, { useState, useEffect } from "react"
import { auth } from '../../firebase-config'
import { onAuthStateChanged } from "firebase/auth";
import CreateReview from "@/components/CreateReview"
import Header from "@/partials/Header";
import { ToastContainer } from "react-toastify";
import { useRouter } from 'next/navigation'
import { User, getReviews } from "@/lib/utils/interfaces"
import ImageFallback from "@/helpers/ImageFallback";
import ReviewCard from "@/components/ReviewCard";
import { ReviewCardSkeleton, SideBarImagesSkeleton } from "@/components/ReviewCard/HomeSkeleton";
import SidebarImages from "@/components/SideBarImages";
import useAuthentication from "@/hooks/useAuthentication";


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
}


const Review: React.FC = () => {
  // State variables
  const [user, setUser] = useState<User>(); // User state
  const [loading, setLoading] = useState<boolean>(true) // Loading state
  const [reviews, setReviews] = useState<Reviews[]>([]); // Reviews state
  const [filteredReviews, setFilteredReviews] = useState<Reviews[]>([]); // Filtered reviews state
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term state
  const [selectedOption, setSelectedOption] = useState<string>(""); // Selected option state
  const [expandedReviewId, setExpandedReviewId] = useState<string>(""); // Expanded review ID state
  const [isOpen, setIsOpen] = useState<boolean>(false); // Modal open state

  const router = useRouter(); // Router instance

  // Effect to check user authentication status
  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) { // If user is authenticated
        // Set user state
        setUser({ email: user.email, uid: user.uid, displayName: user.displayName, photoURL: user.photoURL });
        // Fetch reviews
        getReviews(setReviews);
        setLoading(false);
        
      
      } else { // If user is not authenticated
        // Redirect to login page
        router.push("/login");
        setLoading(false);
      }
      return null; // Render nothing if authentication state is still being checked
    });

    
    // Cleanup function to unsubscribe from authentication state changes
    return () => unsubscribe();
  }, [router]); // Dependency array

 
  // Effect to filter reviews based on search term and selected option
  useEffect(() => {
    filterReviews(); // Call filterReviews function
  }, [reviews, selectedOption, searchTerm]); // Dependency array

  // Function to filter reviews based on search term and selected option
  const filterReviews = () => {
    let filteredData = [...reviews]; // Copy reviews array

    // Filter based on selected option
    if (selectedOption) {
      filteredData = filteredData.filter((review) => review.options.includes(selectedOption));
    }

    // Filter based on search term
    if (searchTerm) {
      filteredData = filteredData.filter((review) => review.location.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Set filtered reviews state
    setFilteredReviews(filteredData);
  };

  // Function to toggle comment section of a review
  const toggleComment = (id: string) => {
    setExpandedReviewId((prevId) => (prevId === id ? "" : id));
  };

  // Function to toggle modal open/close
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Function to close modal
  const closeModal = () => {
    setIsOpen(false);
  };

  return (

    <div>
      {/* Header component */}
      <Header
        logoSrc="/images/Logo.svg"
        username="James T"
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        setSelectedOption={setSelectedOption}
        toggleModal={toggleModal}
        filteredReviewsCount={filteredReviews.length}
      />
      {/* Toast container */}
      <ToastContainer className="bg-[fbfcfd] " />
      {/* Conditional rendering based on reviews */}


      <div className="container">

        <div className="row justify-center">
          <div className="lg:col-7 md:col-9 mb-8 text-start px-[6rem] pr-9 pl-9 md:pl-[6rem] py-[3rem]">
            {/* Review cards */}
            {filteredReviews.length === 0 ? (
              // Show empty state if there are no reviews
              <div className="">
                <ReviewCardSkeleton />
              </div>
            ) : (
              <div>
                {filteredReviews.map((review: Reviews) => (

                  <ReviewCard expandedReviewId={expandedReviewId} review={review} timestamp={review.timestamp} toggleComment={toggleComment} />
                ))}
              </div>
            )}
          </div>
          {/* Sidebar content */}
          <div className="lg:col-5 hidden md:block px-[3.5rem] py-[3rem] pl-0 relative">
          {filteredReviews.length === 0 ? (
       
              <SideBarImagesSkeleton/>
      
            ) : (
            <SidebarImages filteredReviews={filteredReviews} searchTerm={searchTerm} />
            )}

          </div>
        </div>

      </div>


      {/* Create review modal */}
      {isOpen && (
        <CreateReview locations={[]} options={[]}
          closeModal={closeModal}

        />

      )}
    </div>

  );
};


export default Review;