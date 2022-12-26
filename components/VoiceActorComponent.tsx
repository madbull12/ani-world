import Image from "next/legacy/image";
import React from "react";
import { VoiceActor } from "../interface";

const VoiceActorComponent = ({ voice_actor }:{ voice_actor:VoiceActor }) => {
  return (
    <div className="flex min-[500px]:gap-2  min-[500px]:items-start min-[500px]:text-start items-center  text-center flex-col min-[500px]:flex-row justify-between min-[500px]:w-[200px]">
      <div className="text-xs sm:text-base">
        <p className={`font-semibold text-blue-500`}>
          {voice_actor.person.name}
        </p>
        <p className="text-sm text-gray-500">{voice_actor.language}</p>
      </div>
      <div>
        <Image
          className="rounded-lg"
          src={voice_actor.person.images.jpg.image_url}
          width={60}
          height={70}
          alt={voice_actor.person.name}
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default VoiceActorComponent;
