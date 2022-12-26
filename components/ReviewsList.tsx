import React from "react";
import { v4 } from "uuid";
import { Review } from "../interface";
import Loader from "./Loader";
import ReviewComponent from "./ReviewComponent";

const ReviewsList = ({ reviews }: { reviews: Review[] }) => {
  return (
    <>
      {reviews ? (
        <div className="px-4">
          {reviews.length === 0 ? (
            <h1 className="text-lg font-semibold">No reviews</h1>
          ) : (
            <>
              <h1 className="text-2xl font-bold">Reviews</h1>
              <div className="space-y-2">
                {reviews?.slice(0, 10).map((review) => (
                  <ReviewComponent key={v4()} review={review} />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ReviewsList;
