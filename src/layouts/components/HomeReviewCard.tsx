import React from "react";
import ImageFallback from "@/helpers/ImageFallback";
import { FaCommentAlt, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
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
interface Props {
  review: Reviews;
  index: number;
}

const HomeReviewCard: React.FC<Props> = ({ review, index }) => {
  const shortenText = (text: string | undefined, maxLength: number): string => {
    if (!text || text.length <= maxLength) {
        return text || '';
    } else {
        return text.slice(0, maxLength) + '.';
    }
};

  return (
    <div>
      <div key={index} className={`bg-body dark:bg-darkmode-body px-4 py-2 pt-0 rounded-lg`}>
        <ul className="mb-2">
          <li className="mr-4 inline-block">
            <div className="inline-block text-[12px]">
              <ImageFallback
                className="mb-2 h-6 w-6 object-cover rounded-full mt-4 mr-2 inline-block"
                src={review.user?.photoURL}
                alt={review.user?.displayName}
                width={25}
                height={25}
              />
              {shortenText(review.user?.displayName, 10) || shortenText(review.user?.email, 10)}
            </div>
            <div>
          <p className="text-[8px] ml-8 mt-[-18px]"  >{useTimeAgo(review.timestamp?.seconds)}</p>
            </div>
          </li>
          <li className="ml-[2.5rem] inline-block">
            <div>
              <p className="text-[10px]">{shortenText(review.location, 13)}</p>
            </div>
            <div></div>
          </li>
        </ul>
        <p className="mb-2 text-[13px] leading-[1.20rem]">{review?.review}</p>
        <ul className="mb-0">
          <li className="mr-2 inline-block text-[10px]">
            <FaThumbsUp className={"-mt-1 mr-1 inline-block"} />
            {review.upVotesUsers?.length > 0 ? review.upVotesUsers?.length : 0}
          </li>
          <li className="mr-2 inline-block text-[10px]">
            <FaThumbsDown className={"-mt-1 mr-1 inline-block"} />
            {review.downVotesUsers?.length > 0 ? review.downVotesUsers?.length : 0}
          </li>
          <li className="mr-4 inline-block  text-[10px]">
            <FaCommentAlt className={"-mt-1 mr-1 inline-block"} />
            {review.comment?.length > 0 ? review.comment?.length : '0'}

          </li>
          <li className="inline-block ml-6 text-[9px] w-[45px] h-[15px] rounded-[10px] items-center text-center bg-[#d9a0eb]">
          <p>No issue</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeReviewCard;
