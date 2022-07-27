import { useEffect, useState } from "react";

const useLocalStorage = (key:string,initial:any) => {
    const [value,setValue] = useState(()=>{
      if(typeof window !== "undefined") {
          try {
            const saved = window.localStorage.getItem(key);
            if(saved !== null) {
              return JSON.parse(saved);
  
            }
  
          } catch (err) {
         
            console.log(err);
          }
  
  
     
      }
  
      return initial;
    });
  
    useEffect(()=>{
      window.localStorage.setItem(key,JSON.stringify(value));
    },[value]);
  
    return [value,setValue]
  }

  export default useLocalStorage