import ImageFallback from "@/helpers/ImageFallback";
import React from "react";
import imagesData from "../../content/placesImages.json";


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

interface SidebarContentProps {
    filteredReviews: Reviews[];
    searchTerm: string;
}


const SidebarImages: React.FC<SidebarContentProps> = ({ searchTerm }) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const imageData = imagesData.find(data => data.searchTerm.toLowerCase().includes(lowerCaseSearchTerm)) || imagesData.find(data => data.searchTerm === "Default");
   
    if (!imageData) {
        return null; // Render nothing if imageData is undefined
    }
    return (
        <div className="rowH w-[92%] px-[1px]">
            {
                imageData.images.map((imageSrc: string, index: number) => (
                    <div key={index} className="mb-4 md:col-6">
                        <ImageFallback width={"100%"} height={"11rem"} className="bg-[#6b2855] h-44 px-0 py-0 pt-0 object-cover w-full rounded-lg" src={imageSrc} alt="" />
                    </div>
                ))

            }
        </div>

    );
};;

export default SidebarImages;
