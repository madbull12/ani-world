import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import { SkeletonTheme } from 'react-loading-skeleton'
import { useEffect } from 'react'
import { useSearch, useSetBodyScroll } from '../lib/zustand'
import { AnimatePresence } from 'framer-motion'
import Search from '../components/Search'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const { scrollSet } = useSetBodyScroll();
  const router = useRouter();

  useEffect(()=>{
    document.body.style.overflow = scrollSet ? "visible" : "hidden";
  },[scrollSet]);

  const { isOpen } = useSearch();

  if(typeof window !== 'undefined') {
    if(router.pathname !== "/top-anime") {
      window.localStorage.setItem("page",JSON.stringify(1));
  
    }
  }

  
  return (
    <div>
         <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={()=>null}

          >
              {isOpen && <Search  />}
          </AnimatePresence>
      <SkeletonTheme baseColor='#EFF6FF' highlightColor="#fff">
          <Header />
          <Component {...pageProps} />
      
      </SkeletonTheme>
    </div>


  )
}

export default MyApp
