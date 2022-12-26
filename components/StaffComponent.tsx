import Image from "next/legacy/image";
import React from "react";
import { v4 } from "uuid";
import { Staff } from "../interface";

const StaffComponent = ({ item }: { item: Staff }) => {
  return (
    <div className="flex gap-x-2 py-2">
      <Image
        src={item.person.images.jpg.image_url}
        alt={item.person.name}
        width={60}
        height={70}
        objectFit="cover"
        className="rounded-lg"
      />
      <div className="space-y-3">
        <p className={`font-semibold text-blue-500`}>{item.person.name}</p>
        {item.positions.map((position, i: any) => (
          <span key={v4()} className="font-normal">{`${
            i ? "," : ""
          } ${position}`}</span>
        ))}
      </div>
    </div>
  );
};

export default StaffComponent;
