import HomeReviewCard from "@/components/HomeReviewCard";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { Button, Review } from "@/types";
import Link from "next/link";
import ImageFallback from "@/helpers/ImageFallback";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const homepage = getListPage("homepage/_index.md");

  const { frontmatter } = homepage;
  const {
    banner,
    reviews,
  }: {
    banner: { title: string; content?: string; button?: Button };
    reviews: Review[];
  } = frontmatter;

  return (
    <>

      <SeoMeta />
      <section className="section bg-[#fbfcfd] pt-4 fixed h-full  w-full">
        <div className="home-header bg-[#fbfcfd] header absolute w-full z-40  px-4 md:px-12 top-0"
        >
          <nav className="navbar container uppercase text-[12px]">
            {/* logo */}
            <div className="order-0">
               <ImageFallback src="/images/Logo.svg" className="mt-4" width={120} height={85} />
            </div>
            <ul>
              <li>
                <Link
                  className=""
                  href="#"
                >
                  Login
                </Link>
              </li>
            </ul>

          </nav>
        </div>
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-7 md:col-9 mb-8 text-start px-8 md:px-[11rem] py-[15rem] md:py-[6rem]">
              <h1
                className="mb-4 text-h1  md:text-h1"
                dangerouslySetInnerHTML={markdownify(banner.title)}
              />
              <p
                className="mb-3 mr-[5rem]"
                dangerouslySetInnerHTML={markdownify(banner.content ?? "")}
              />
              <div className="mb-4 md:mb-2 w-full">
                <span className="relative top-[2.25rem] mb-1 inset-y-0  pl-3 flex items-center">

                 <FaSearch size={15} />
                </span>
                <input placeholder="Enter an Address"
                  className="searchInput px-9 md:px-9 py-2"
                  type="input"
                />
              </div>
              {banner.button!.enable && (
                <Link
                  className="btn w-1/3 btn-primary uppercase"
                  href="/review"
                >
                  {banner.button!.label}
                </Link>
              )}
            </div>
            <div className="lg:col-5 relative top-0  hidden md:flex md:top-[-10rem]">
 <ImageFallback src="/images/Overlay.svg" className="absolute right-[30px] top-44 flex w-[1225px]" height="100" width={100} />
              <div className="rowH bg-[#fafcfd] w-[92%] px-[1px]">
                <div className="absolute h-[125vh] left-0 bg-[#fbfcfd] dark:bg-darkmode-body w-[2.5%]" />
                <div className="absolute h-[125vh] right-0 bg-[#fbfcfd] dark:bg-darkmode-body w-[13%]" />
                
                {reviews.map((review, index: number) => (
                  <div key={index} className="mb-4 md:col-6">
                    <HomeReviewCard data={review} />

                  </div>
                ))}
              </div>
              <ImageFallback src="/images/Overlay.svg" className="absolute right-[30px] bottom-52 flex w-[1225px]" height="100" width={100} />
            </div>
          </div>
        </div>
       
      </section>



    </>
  );
};

export default Home;
