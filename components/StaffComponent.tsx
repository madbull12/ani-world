import Image from "next/legacy/image";
import React from "react";
import { v4 } from "uuid";
import { Staff } from "../interface";

const StaffComponent = ({ item }: { item: Staff }) => {
  return (
    <div className="flex gap-x-2  p-2 ">
      <div className="w-16 h-16 relative">
        <Image
          src={item.person.images.jpg.image_url}
          alt={item.person.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg "
        />
      </div>

      <div className="space-y-3 truncate w-1/2">
        <p className={`font-semibold text-sm md:text-base text-blue-500`}>
          {item.person.name}
        </p>
        {item.positions.map((position, i: any) => (
          <span key={v4()} className="font-normal text-xs">{`${
            i ? "," : ""
          } ${position}`}</span>
        ))}
      </div>
    </div>
  );
};

export default StaffComponent;
