import React from "react";
import useSWR from "swr";
import Loader from "../../components/Loader";
import Saved from "../../components/Saved";
import UserProfile from "../../components/UserProfile";
import fetcher from "../../helper/fetcher";
import { ISaved, ISavedResp } from "../../interface";

import { v4 as uuidv4 } from "uuid";

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
                  <h1 className="text-xl font-bold">Favourite Anime</h1>
                  <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1">
                    {favourites?.map((item: ISavedResp) => (
                      <Saved item={item?.saved} key={uuidv4()} />
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
