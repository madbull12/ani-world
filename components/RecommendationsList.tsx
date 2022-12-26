import React from "react";
import { v4 } from "uuid";
import { Recommendation } from "../interface";
import Loader from "./Loader";
import Poster from "./Poster";
import RecommendationComponent from "./RecommendationComponent";

const RecommendationsList = ({
  recommendations,
}: {
  recommendations: Recommendation[];
}) => {
  return (
    <>
      {recommendations ? (
        <div className="px-4">
          {recommendations.length === 0 ? (
            <h1 className="text-lg font-semibold">No recommendations</h1>
          ) : (
            <>
              <h1 className="text-2xl font-bold ">Recommendations</h1>
              <div className="grid  gap-4 min-w-0 overflow-x-scroll  auto-cols-max grid-flow-col scrollbar-hide md:scrollbar-default  overflow-y-hidden">
                {recommendations?.slice(0, 10).map((recommendation) => (
                  <RecommendationComponent recommendation={recommendation} key={v4()} />
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

export default RecommendationsList;
