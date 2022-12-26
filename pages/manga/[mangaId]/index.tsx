import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import Container from "../../../components/Container";
import MangaDetailsComponent from "../../../components/MangaDetailsComponent";
import fetcher from "../../../helper/fetcher";

const MangaDetailsPage = () => {
  const router = useRouter();
  const { mangaId } = router.query;
  console.log(router);
  const { data: manga } = useSWR(
    `https://api.jikan.moe/v4/manga/${mangaId}`,
    fetcher
  );
  console.log(manga.data);
  return (
    <main className="">
      <MangaDetailsComponent manga={manga?.data}>
        <h1>fdd</h1>
      </MangaDetailsComponent>
    </main>
  );
};

export default MangaDetailsPage;
