import React, { useState } from "react";
import useSWR from "swr";
import Container from "../components/Container";
import TopComponent from "../components/TopComponent";
import TopNav from "../components/TopNav";
import fetcher from "../helper/fetcher";
import useLocalStorage from "../hooks/useLocalStorage";

const TopManga = () => {
    const [filter, setFilter] = useState("");
    const [page, setPage] = useLocalStorage("page", 1);
  const { data: topManga } = useSWR(
    `https://api.jikan.moe/v4/top/manga?page=${page}&filter=${filter}`,
    fetcher
  );

  return (
    <Container>
      <TopComponent filter={filter} setFilter={setFilter} page={page} setPage={setPage} item={topManga?.data} isManga={true} />
    </Container>
  );
};

export default TopManga;
