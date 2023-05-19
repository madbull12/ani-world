import Link from "next/link";
import React from "react";
import { v4 } from "uuid";

interface DropdownProps {
    title:string;
    items:ItemProps[];
}

interface ItemProps {
    text:string;
    link:string;
}
const Dropdown = ({ title,items }:DropdownProps) => {
  return (
    <div className="dropdown ">
      <label tabIndex={0} className="btn text-sm m-1 border-none">
        {title}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content  text-primary menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {items?.map((item)=>(
            <li className="text-sm" key={v4()}>
                <Link href={item.link}>{item.text}</Link>
            </li>
        ))}
       
      </ul>
    </div>
  );
};

export default Dropdown;
