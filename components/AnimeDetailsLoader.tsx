import React from "react";
import ContentLoader from "react-content-loader";

const AnimeDetailsLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={1280}
    height={720}
    viewBox="0 0 1280 720"
    backgroundColor="#eff6ff"
    foregroundColor="#f2eded"
    {...props}
  >
    <rect x="128" y="104" rx="0" ry="0" width="1" height="1" />
    <rect x="14" y="120" rx="0" ry="0" width="197" height="256" />
    <rect x="226" y="277" rx="5" ry="5" width="119" height="12" />
    <circle cx="515" cy="270" r="15" />
    <circle cx="555" cy="270" r="15" />
    <rect x="-4" y="480" rx="8" ry="8" width="575" height="17" />
    <rect x="-3" y="506" rx="8" ry="8" width="575" height="17" />
    <rect x="-3" y="534" rx="8" ry="8" width="575" height="17" />
    <rect x="224" y="247" rx="5" ry="5" width="137" height="20" />
    <rect x="-2" y="563" rx="8" ry="8" width="575" height="17" />
    <rect x="-1" y="591" rx="8" ry="8" width="575" height="17" />
    <rect x="-1" y="619" rx="8" ry="8" width="575" height="17" />
    <rect x="227" y="311" rx="10" ry="10" width="115" height="16" />
    <rect x="465" y="320" rx="0" ry="0" width="34" height="4" />
    <rect x="548" y="320" rx="0" ry="0" width="34" height="4" />
    <rect x="507" y="320" rx="0" ry="0" width="34" height="4" />
    <rect x="230" y="339" rx="5" ry="5" width="348" height="5" />
    <rect x="230" y="349" rx="5" ry="5" width="348" height="5" />
    <rect x="230" y="359" rx="5" ry="5" width="348" height="5" />
    <rect x="14" y="397" rx="9" ry="9" width="87" height="66" />
    <rect x="119" y="406" rx="0" ry="0" width="450" height="5" />
    <rect x="119" y="428" rx="0" ry="0" width="450" height="5" />
  </ContentLoader>
);

export default AnimeDetailsLoader;
