import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import { SkeletonTheme } from "react-loading-skeleton";
import { useEffect } from "react";
import { useSearch, useSetBodyScroll, useToggle } from "../lib/zustand";
import { AnimatePresence } from "framer-motion";
import Search from "../components/Search";
import { useRouter } from "next/router";
import ToggleNav from "../components/ToggleNav";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import AuthWrapper from "../components/AuthWrapper";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { scrollSet } = useSetBodyScroll();
  const { isOpen } = useSearch();
  const { isToggle } = useToggle();

  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = scrollSet ? "visible" : "hidden";
  }, [scrollSet]);

  if (typeof window !== "undefined") {
    if (router.pathname !== "/top-anime") {
      window.localStorage.setItem("page", JSON.stringify(1));
    }
  }

  return (
    <div data-theme="pinkTheme">
      <SessionProvider session={session}>
        <AuthWrapper>
          <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
          >
            {isOpen && <Search />}
          </AnimatePresence>
          <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
          >
            {isToggle && <ToggleNav />}
          </AnimatePresence>
          <Layout>
            <Toaster />
            <Header />
            <Component {...pageProps} />
          </Layout>
        </AuthWrapper>
      </SessionProvider>
    </div>
      
  );
}

export default MyApp;
