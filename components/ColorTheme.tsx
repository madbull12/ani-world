import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useTheme } from '../lib/zustand';

interface ITheme {
    color:string;
    onClick:(e:any)=>void
}
const Theme = ({ color,onClick }:ITheme) => {
    return (
        <div className={`${color} rounded-lg`} onClick={onClick}></div>

    )

}

const ColorTheme = () => {
    const { theme,setTheme } = useTheme();
  return (
    <section className='grid grid-cols-6 gap-2 [&>*]:w-8 [&>*]:h-8 [&>*]:cursor-pointer my-4'>
        <Theme color="bg-emerald-500" onClick={(e)=>{
            e.stopPropagation();
            setTheme("#10b981")}
        } />
        <Theme color="bg-violet-500" onClick={()=>setTheme("#8b5cf6")} />
        <Theme color="bg-blue-500" onClick={()=>setTheme("#3b82f6")} />
        <Theme color="bg-pink-500" onClick={()=>setTheme("#ec4899")} />
        <Theme color="bg-yellow-500" onClick={()=>setTheme("#eab308")} />
        <Theme color="bg-lime-500" onClick={()=>setTheme("#84cc16")} />
        {/* <div className='rounded-lg ' ></div>
        <div className='rounded-lg bg-violet-500' ></div>
        <div className='rounded-lg bg-blue-500' ></div>
        <div className='rounded-lg bg-pink-500' ></div>
        <div className='rounded-lg bg-yellow-500' ></div>
        <div className='rounded-lg bg-lime-500' ></div> */}
    </section>
  )
}

export default ColorTheme