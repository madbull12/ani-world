import "../styles/globals.css";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import {
  useSearch,
  useSetBodyScroll,
  useThemeModal,
  useToggle,
} from "../lib/zustand";
import { AnimatePresence } from "framer-motion";
import Search from "../components/Search";
import { useRouter } from "next/router";
import ToggleNav from "../components/ToggleNav";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import AuthWrapper from "../components/AuthWrapper";
import Layout from "../components/Layout";
import { api } from "../utils/api";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import ThemeChangerModal from "../components/ThemeChangerModal";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { scrollSet } = useSetBodyScroll();
  const { isOpen: isOpenSearch } = useSearch();
  const { isOpen: isOpenThemeModal } = useThemeModal();
  const { isToggle } = useToggle();

  const theme = useReadLocalStorage("theme")
  console.log(theme)

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
    <div data-theme={theme}>
      <SessionProvider session={session}>
        <AuthWrapper>
          <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
          >
            {isOpenSearch && <Search />}
          </AnimatePresence>
          <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
          >
            {isOpenThemeModal && <ThemeChangerModal />}
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
};

export default api.withTRPC(MyApp);
