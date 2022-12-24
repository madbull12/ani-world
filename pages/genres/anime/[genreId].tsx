import { useRouter } from 'next/router';
import React,{ useState } from 'react'
import useSWR from 'swr'
import { v4 } from 'uuid';
import CardInfo from '../../../components/CardInfo';
import Container from '../../../components/Container';
import Loader from '../../../components/Loader';
import fetcher from '../../../helper/fetcher';
import { genres } from '../../../helper/genres';
import { Anime, AnimeDetailsProps } from '../../../interface';
const GenreDetails = () => {
    const router = useRouter()
    const { genreId } = router.query;
  const [page, setPage] = useState(1);

    const { data } = useSWR(`https://api.jikan.moe/v4/anime?genres=${genreId}&page=${page}`,fetcher);
  const { data: anime }: { data: AnimeDetailsProps[] } = data || {};
  console.log(anime)
    const genre = genres?.find((genre)=>genre?.mal_id === parseInt(genreId as string))?.name;

  return (
    <Container>
        {anime ? (
        <>
            <h1 className="text-blue-500 font-bold text-xl">{genre}</h1>
          <div className="text-blue-500 font-bold justify-end my-4  flex gap-x-2">
            {page > 1 && (
              <button
                onClick={() => setPage(page - 1)}
                className="hover:text-blue-400"
              >
                Previous
              </button>
            )}

            <button
              onClick={() => setPage(page + 1)}
              className="hover:text-blue-400"
            >
              Next
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
            {anime.map((item) => (
              <CardInfo key={v4()} anime={item} />
            ))}
          </div>
          <div className="text-blue-500 font-bold justify-center my-4  flex gap-x-2">
            {page > 1 && (
              <button
                onClick={() => setPage(page - 1)}
                className="hover:text-blue-400"
              >
                Previous
              </button>
            )}

            <button
              onClick={() => setPage(page + 1)}
              className="hover:text-blue-400"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </Container>
  )
}

export default GenreDetails