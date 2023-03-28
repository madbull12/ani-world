import Image from "next/legacy/image";
import React,{ useState } from "react";
import { v4 } from "uuid";
import { Staff } from "../interface";
import MotionBtn from "./MotionBtn";
import StaffComponent from "./StaffComponent";

const StaffList = ({ staff }:{ staff:Staff[] }) => {
  const [loadMoreStaff, setLoadMoreStaff] = useState(10);

  return (
    <>
      <h1 className="text-2xl font-bold pb-2">Staff</h1>
      <div className={` p-2 space-y-4  `}>
        {staff?.slice(0, loadMoreStaff).map((item) => (
          <StaffComponent key={v4()} item={item} />
        ))}
        <div className="flex justify-center">
          <MotionBtn
            handleClick={() =>
              staff?.length >= loadMoreStaff
                ? setLoadMoreStaff((prev) => (prev += 5))
                : setLoadMoreStaff(10)
            }
            string={staff?.length >= loadMoreStaff ? "Load more" : "Show less"}
          />
        </div>
      </div>
    </>
  );
};

export default StaffList;
