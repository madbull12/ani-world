import React from "react";
import { Recommendation } from "../interface";
import Poster from "./Poster";

const RecommendationComponent = ({
  recommendation,
}: {
  recommendation: Recommendation;
}) => {
  return (
    <div className="flex flex-col">
        <div>
          <Poster anime={recommendation.entry} />
        </div>

        <p className="text-lg font-bold">
          Users: <span className="font-normal">{recommendation.votes}</span>
        </p>
    </div>
  );
};

export default RecommendationComponent;
