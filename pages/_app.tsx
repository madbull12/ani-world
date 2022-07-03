import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import { SkeletonTheme } from 'react-loading-skeleton'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SkeletonTheme baseColor='#EFF6FF' highlightColor="#fff">
        <Header />
        <Component {...pageProps} />
    
    </SkeletonTheme>

  )
}

export default MyApp
