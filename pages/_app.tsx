import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import { SkeletonTheme } from 'react-loading-skeleton'
import { useEffect } from 'react'
import { useSetBodyScroll } from '../lib/zustand'

function MyApp({ Component, pageProps }: AppProps) {
  const { scrollSet } = useSetBodyScroll();
  useEffect(()=>{
    document.body.style.overflow = scrollSet ? "visible" : "hidden";
  },[scrollSet])
  return (
    <div className='overflow-hidden'>
      <SkeletonTheme baseColor='#EFF6FF' highlightColor="#fff">
          <Header />
          <Component {...pageProps} />
      
      </SkeletonTheme>
    </div>


  )
}

export default MyApp
