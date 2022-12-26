
import moment from "moment";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useState } from "react";
import truncate from "../helper/truncate";
import { Review } from "../interface";

const ReviewComponent = ({ review }: { review: Review }) => {
  const router = useRouter();
  console.log(review);

  const [readMore, setReadMore] = useState<boolean>(false);

  return (
    <div className="w-full bg-blue-50 p-2 divide-y divide-gray-300">
      <div className="flex gap-x-1 space-between text-sm md:text-base  ">
        <div className="flex gap-x-2 items-start">
          <Image
            src={review.user.images.jpg.image_url}
            width={50}
            height={70}
            alt={review.user.username}
            className="rounded-lg"
          />
          <div className="space-y-1">
            <p className="text-blue-500 font-thin">{review.user.username}</p>
            <p className="text-gray-400">
              <span className="font-bold">{review.reactions.overall}</span>{" "}
              people find this review helpful
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-x-1  text-gray-500 text-sm">
                <span>🤔</span>
                <p>{review.reactions.confusing}</p>
              </div>
              <div className="flex items-center gap-x-1 text-gray-500 text-sm">
                <span>😎</span>
                <p>{review.reactions.creative}</p>
              </div>
              <div className="flex items-center gap-x-1 text-gray-500 text-sm">
                <span>😂</span>
                <p>{review.reactions.funny}</p>
              </div>
              <div className="flex items-center gap-x-1 text-gray-500 text-sm">
                <span>💡</span>
                <p>{review.reactions.informative}</p>
              </div>
              <div className="flex items-center gap-x-1 text-gray-500 text-sm">
                <span>❤</span>
                <p>{review.reactions.love_it}</p>
              </div>
              <div className="flex items-center gap-x-1 text-gray-500 text-sm">
                <span>👍</span>
                <p>{review.reactions.nice}</p>
              </div>
              <div className="flex items-center gap-x-1 text-gray-500 text-sm">
                <span>✔️</span>
                <p>{review.reactions.well_written}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-auto space-y-2 text-[10px] md:text-sm">
          <p className="">{moment(review.date).format("LL")}</p>
          {/* <p className='text-sm text-gray-400'>{review.episodes_watched} of {videos?.episodes.length} episodes watched</p> */}
          <p>Overall rating: {review?.score}</p>
        </div>
      </div>
      <div>
        <p className="text-xs md:text-sm py-4">
          {readMore ? review.review : truncate(review.review, 1000)}

          {review.review.length > 1000 && (
            <>
              <button
                onClick={() => setReadMore(!readMore)}
                className=" font-semibold  text-blue-500 cursor-pointer ml-1"
              >
                {readMore ? "Show less" : "Read more"}
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default ReviewComponent;
