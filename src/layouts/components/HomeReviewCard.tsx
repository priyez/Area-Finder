import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import dateFormat from "@/lib/utils/dateFormat";
import { humanize, plainify, slugify, markdownify } from "@/lib/utils/textConverter";
import { Review } from "@/types";
import { FaCommentAlt, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const HomeReviewCard = ({ data }: { data: Review }) => {
  //   const { summary_length, blog_folder } = config.settings;
  //   const { title, image, author, categories, date } = data.frontmatter;
  console.log(data)
  return (
    <div className="bg-body dark:bg-darkmode-body px-4 py-2 pt-0 rounded-lg">
      <ul className="mb-2">
        <li className="mr-4 inline-block">
          <div className="inline-block text-[12px]">
            {data.image && (
              <ImageFallback
                className="mb-2 rounded mt-4 mr-2 inline-block"
                src={data.image}
                alt={data.author}
                width={25}
                height={25}
              />
            )}
            {humanize(data.author)}
          </div>
          <div>
            <p className="text-[8px] ml-8 mt-[-18px]" dangerouslySetInnerHTML={markdownify(data.time)} />
          </div>
        </li>
        <li className="ml-[2.5rem] inline-block">
          <div>
            <p className="text-[10px] " dangerouslySetInnerHTML={markdownify(data.location)} />
          </div>
          <div>

          </div>

        </li>

      </ul>
      <p className="mb-2 text-[13px] leading-[1.20rem]">
        {plainify(data.content)}
      </p>
      <ul className="mb-0">
        <li className="mr-2 inline-block text-[10px]">
          <FaThumbsUp className={"-mt-1 mr-1 inline-block"} />
          {data.reactions.upVote}
        </li>
        <li className="mr-2 inline-block text-[10px]">
          <FaThumbsDown className={"-mt-1 mr-1 inline-block"} />
          {data.reactions.downVote}
        </li>
        <li className="mr-4 inline-block  text-[10px]">
          <FaCommentAlt className={"-mt-1 mr-1 inline-block"} />
          {data.reactions.comment}
        </li>
        <li className="inline-block ml-6 text-[9px] w-[45px] h-[15px] rounded-[10px] items-center text-center bg-[#d9a0eb]">
          {plainify(data.problem)}
        </li>
      </ul>
    </div>
  );
}

export default HomeReviewCard;
