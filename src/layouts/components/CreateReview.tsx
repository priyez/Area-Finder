import React, {useEffect, useState, FormEventHandler } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "../../firebase-config";
import { FaStar } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { toast } from "react-toastify";
import locations from "../../content/locations.json"
import options from "../../content/amenities.json"
import { addReviews, User } from "@/lib/utils/interfaces"
import "react-toastify/dist/ReactToastify.css";



interface Option {
  id: string;
  label: string;
}


interface CloseProps {
  closeModal: () => void; 
}
interface LocationProps {
  locations: Option[];
  options: Option[] // Define the locations property in the component props
}



const CreateReview: React.FC<LocationProps & CloseProps>  = ({closeModal}) => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [isDrop, setIsDrop] = useState(false);

  const [user, setUser] = useState<User | null>(null); // State to hold user information

  useEffect(() => {
    // Fetch current user on component mount
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If user is authenticated, update state with user information
        setUser({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName ?? "",
          photoURL: user.photoURL
        });
      } else {
        // If no user is authenticated, set user state to null
        setUser(null);
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (!user) {
      // If no user is authenticated, return early
      toast.error("No user is authenticated");
      return;
    }

    const reviewData = {
      location: selectedLocation,
      options: selectedOptions,
      rating,
      review,
    
    };
    addReviews(reviewData.location, reviewData.options, reviewData.rating, reviewData.review, user);
  
      setSelectedLocation("");
      setSelectedOptions([]);
      setRating(0);
      setReview("");
      toast.success("Review submitted ");

  }


  const handleCheckboxChange = (optionId: string) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
    }
  };

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const toggleAccord = () => {
    setIsDrop((prevDrop) => !prevDrop);
  };



  return (
    <>
  
    <div onClick={close} className="fixed w-full h-full  bg-[#1d3045] px-4 xl:px-[25rem] lg:px-[20rem]  py-44 lg:py-16 xl:py-24 top-0 z-50">

    <form onSubmit={handleSubmit} className="w-full rounded-md bg-white py-6 px-8">
      <h5 className="text-[16px] text-center">Review Location</h5>
      <div className="my-2">
     
        <select className="w-full border-0 font-bold" id="location" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
   
          {locations.map((location) => (
            <option key={location.id} value={location.label}>
              {location.label}
            </option>
          ))}
        </select>
      </div>
      <div className=" bg-[#F2F6FD] rounded-t-md px-2">
        <span   onClick={toggleAccord} className="text-[10px] w-full inline-flex py-2 my-2 font-bold">Select Amenties {isDrop ? <FaChevronDown size={15} className="ml-[65%] md:ml-[36.5rem] lg:ml-[16.5rem]  xl:ml-[22rem]"/> :  <FaChevronUp size={15} className="ml-[65%] md:ml-[36.5rem] lg:ml-[16.5rem] xl:ml-[22rem]"/>} </span>
           {/* Hide the div below when not expanded */}
           {isDrop && (
        <div className="rowMB md:rowH  px-[1px] absolute  w-[80.2%] md:w-[88.55%] lg:w-[36.25%] xl:w-[35.80%] border-t border-gray-300  bg-[#F2F6FD]">
        {options.map((option) => (
          <div key={option.id} className="mb-4 col-20">
            <input
              type="checkbox"
              id={option.id}
              checked={selectedOptions.includes(option.id)}
              onChange={() => handleCheckboxChange(option.id)}
            />
            <label htmlFor={option.id} className="text-[8px] whitespace-normal md:text-[10px] ml-1 md:ml-1">{option.label}</label>
          </div>
        ))}
        </div>
           )}
      </div>
      <div className="block my-1">
      <label htmlFor="rate" className="text-[12px] font-bold">Rate location</label>
      <div className="flex">
      {[1, 2, 3, 4, 5].map((value) => (
 <FaStar
 key={value}
 size={20}
 color={value <= rating ? "#ffc107" : "#e4e5e9"}
 style={{ cursor: "pointer" }}
 className="mr-2"
 onClick={() => handleStarClick(value)}
            />
          ))}
      </div>
      </div>
      <div className="block my-2">
        <label htmlFor="review" className="text-[12px] font-bold">Write Review</label>
        <textarea id="review" className="w-full h-32 rounded-md" placeholder="Write your Review" value={review} onChange={(e) => setReview(e.target.value)} />
      </div>
      <div className='flex my-1 items-center text-sm font-[500]'>
           <input
           type="checkbox"  className='mt-1 h-3 w-3 cursor-pointer border rounded-sm border-[#484C4A] accent-black outline-none focus:outline-none focus:ring-0'  />
            <label
              htmlFor='checkbox'
              className='ml-2 mt-1 text-sm text-[#484851]'
            >
              Post as Anonymous
            </label>
          </div>
      <div className="w-full flex justify-between">
      <button  className="btn btn-primary uppercase bg-blue-500 text-white border-blue-500 w-[48%]" type="submit">Submit</button>
      <button  onClick={closeModal} className="btn btn-primary uppercase bg-transparent text-blue-500 border-blue-500 w-[48%]">Cancel</button>
      </div>

    </form>
    </div>
 
   </>
  );
};

export default CreateReview;
