import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { Anime, IRow } from "../interface";
import { getAnimeNews } from "../pages/api/anime";

const NewsRow = () => {
  const [items, setItems] = useState<Anime[]>([]);
  useEffect(() => {
    const fetchAnimeNews = async () => {
      const news = await getAnimeNews();
      setItems(news);
    };

    fetchAnimeNews();
    console.log(items);
  }, []);

  return (
    <div>
      {items?.map((news) => (
        <p key={v4()}>{news.title}</p>
      ))}
    </div>
  );
};

export default NewsRow;
