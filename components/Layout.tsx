import React from "react";


const Overlay = ()=>{
  return(
    <div className="fixed  z-10 text-white bottom-0 h-full w-full  radialOverlayGradient" >

    </div>
  )
}

const Layout = ({children}:{children:React.ReactNode}) => {
  return <main className="bg-black relative min-h-[450vh] z-50 ">
    <div className="relative z-20">
    {children}

    </div>
    <Overlay />
  </main>;
};

export default Layout;
