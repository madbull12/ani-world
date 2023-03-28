import React, { useState } from "react";
import { v4 } from "uuid";
import { Character } from "../interface";
import CharacterComponent from "./CharacterComponent";
import LineOverlay from "./LineOverlay";
import MotionBtn from "./MotionBtn";
const CharactersList = ({ characters }: { characters: Character[] }) => {
  const [loadMoreCharacters, setLoadMoreCharacters] = useState(10);

  return (
    <>
      <h1 className="text-2xl font-bold pb-2">Characters</h1>

      <div
        className={`  p-2  space-y-2 mb-4`}
      >
        {characters.slice(0, loadMoreCharacters).map((character) => (
          <CharacterComponent key={v4()} character={character} />
        ))}

        <div className="flex justify-center">
          <MotionBtn
            handleClick={() =>
              characters?.length >= loadMoreCharacters
                ? setLoadMoreCharacters((prev) => (prev += 5))
                : setLoadMoreCharacters(10)
            }
            string={
              characters?.length >= loadMoreCharacters
                ? "Load more"
                : "Show less"
            }
          />
        </div>
      </div>
    </>
  );
};

export default CharactersList;
