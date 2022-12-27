import React from "react";
import useSWR from "swr";
import Loader from "../../components/Loader";
import Saved from "../../components/Saved";
import UserProfile from "../../components/UserProfile";
import fetcher from "../../helper/fetcher";
import {  ISavedResp } from "../../interface";

import { v4 as uuidv4 } from "uuid";
import { animeTypes, bookTypes } from "../api/anime";

const FavouritePage = () => {
  const { data: favourites } = useSWR(`/api/favorite`, fetcher);
  console.log(favourites);
  return (
    <main className="flex min-h-[90vh] justify-center items-center p-4">
      {!favourites ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center">
          <UserProfile />

          <div className="justify-self-start mt-4">
            <>
              {favourites?.length !== 0 ? (
                <>
                  <h1 className="text-xl font-bold text-blue-500">Favourite Anime</h1>
                  <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1">
                    {favourites?.filter((item:ISavedResp)=>animeTypes.includes(item.type.toLowerCase())).map((item: ISavedResp) => (
                      <Saved item={item} key={uuidv4()} />
                    ))}
                  </div>
                  <h1 className="text-xl font-bold text-blue-500 mt-4">Favourite Books</h1>
                  <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1">
                    {favourites?.filter((item:ISavedResp)=>bookTypes.includes(item.type.toLowerCase())).map((item: ISavedResp) => (
                      <Saved item={item} key={uuidv4()} />
                    ))}
                  </div>

                </>
              ) : (
                <p>No anime saved yet</p>

              )}
            </>
          </div>
        </div>
      )}
    </main>
  );
};

export default FavouritePage;
