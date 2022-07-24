import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import { SkeletonTheme } from 'react-loading-skeleton'
import { useEffect } from 'react'
import { useOpenSearch, useSetBodyScroll } from '../lib/zustand'
import { AnimatePresence } from 'framer-motion'
import Search from '../components/Search'

function MyApp({ Component, pageProps }: AppProps) {
  const { scrollSet } = useSetBodyScroll();
  useEffect(()=>{
    document.body.style.overflow = scrollSet ? "visible" : "hidden";
  },[scrollSet]);

  const { isOpen } = useOpenSearch();

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
