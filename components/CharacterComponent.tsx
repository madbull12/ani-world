import Image from "next/legacy/image";
import { useRouter } from "next/router";
import React from "react";
import { v4 } from "uuid";
import { Character } from "../interface";
import LineOverlay from "./LineOverlay";
import VoiceActorComponent from "./VoiceActorComponent";

const CharacterComponent = ({ character }: { character: Character }) => {
  const router = useRouter();
  return (
    <>
      {" "}
      <div className="flex gap-x-2  py-2 justify-between">
        <div className="flex gap-x-2 self-start ">
          <Image
            className="rounded-lg"
            src={character?.character.images.jpg.image_url}
            width={60}
            height={70}
            alt={character.character.name}
            objectFit="cover"
          />
          <div className="space-y-3 truncate text-xs sm:text-base">
            <p className={`font-semibold truncate text-primary`}>
              {character?.character.name}
            </p>
            <p className=" text-gray-500">{character?.role}</p>
          </div>
        </div>
        {router.pathname.includes("/anime") ? (
          <div className="space-y-4">
            {character?.voice_actors.map((voice_actor) => (
              <VoiceActorComponent key={v4()} voice_actor={voice_actor} />
            ))}
          </div>
        ) : null}
      </div>
      <LineOverlay />
    </>
  );
};

export default CharacterComponent;
