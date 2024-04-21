import React, { useState, useCallback, useEffect } from "react"
import { auth } from '../../firebase-config'
import { FaStar } from "react-icons/fa";
import { getReviews, User, deleteReview as deleteReviewAPI } from '@/lib/utils/interfaces'; // Import getReviews function
import ImageFallback from "@/helpers/ImageFallback";
import Search from "./Search";
import Icon from "./Icon";
import { AllReviewsSkeleton } from "./ReviewCard/HomeSkeleton";
import useTimeAgo from "@/hooks/useTimeAgo";




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
      photoURL : string;
    };
    timestamp: {
      seconds: number;
      nanoseconds: number;
    };
  
  }

const AllReviews: React.FC = () => {
    const [reviews, setReviews] = useState<Reviews[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User>()
    const [searchQuery, setSearchQuery] = useState<string>("");

const isUserLoggedIn = useCallback(() => {
        const fetchReviews = async () => {
        await getReviews(setReviews);
 
      }
    fetchReviews();
  }, []);


  useEffect(() => {
    isUserLoggedIn();
  }, [isUserLoggedIn]);


    const currentUser = auth.currentUser;

    // Filter reviews based on the current user's ID
    const userReviews = reviews.filter(review => review.user?.email === currentUser?.email);
   


        // Filter reviews based on search query
        const filteredReviews = userReviews.filter(review =>
            review.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.review.toLowerCase().includes(searchQuery.toLowerCase())
        );
    
  // Function to delete a review
  const deleteReview = async (id: string) => {
    try {
        await deleteReviewAPI(id); // Call the deleteReview function from the API
        setReviews(reviews.filter(review => review.id !== id)); // Update the reviews state after successful deletion
    } catch (error) {
        console.error("Error deleting review:", error);
    }
};
    return (
        <div className="my-16 md:my-8">
        <div className="px-4 md:pt-8">
            <h4 className="text-[22px]">All Reviews Created</h4>
            <div className="lg:flex w-full md:w-[65%] mt-4">
            <Search  placeholder="Search by location, review..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
         </div>
        </div>
        
        <div id="profile" className="w-full px-1 mt-32 md:mt-16 md:px-8" >
        <div className="rowH bg-[#fafcfd] w-[100%] px-[1px]">
        {filteredReviews.length === 0 ? (
        // Show empty state if there are no reviews
        
             <AllReviewsSkeleton/>
     
      ) : (
          <>
            {filteredReviews.map((review) => (
                
            <div  className="mb-4 md:col-6" key={review.id}>
                <ul className="mb-2 flex justify-normal">
                    <li className="inline-block">
                        <div className="w-[20px] inline-block">
                        {review.user.email === currentUser?.email && (
                                            <div className="mt-7">
                                               
                                                <button onClick={() => deleteReview(review.id)} className="text-red-600"><Icon icon="delete" width={25} height={25} fill="none" /></button>
                                            </div>
                                        )}
              
                        </div>

                    </li>
                    <li className="ml-1 inline-block mt-3">

                        <div className="inline-block py-2 px-4 text-[12px]">
                            <p className="text-[16px] ml-1 inline-flex  font-semibold" >{review.location}  <FaStar color="yellow" size={12} className={"mt-[0.15rem] mr-1 inline-block"} />{review.rating}.0</p>
                            <p className="text-[12px] mt-[0.25rem] flex" > {review.review}</p>
                            {/* <p className="text-[10px] mt-[0.25rem] uppercase inline-flex" >  {useTimeAgo(review.timestamp && review.timestamp.seconds)}  </p> */}
                        </div>

                    </li>

                </ul>
             
            </div>
             ))}
              </>
              )}
        </div>
        </div>
        </div>
    );
};

export default AllReviews;
