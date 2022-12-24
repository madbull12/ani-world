import React from "react";
import useSWR from "swr";
import Saved from "../../components/Saved";
import UserProfile from "../../components/UserProfile";
import fetcher from "../../helper/fetcher";
import { ISavedResp } from "../../interface";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../components/Loader";

const WatchLaterPage = () => {
  const { data: watchLater } = useSWR(`/api/watch-later`, fetcher);
  console.log(watchLater);
  return (
    <main className="flex min-h-[90vh] justify-center items-center p-4">
      {!watchLater ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center">
          <UserProfile />

          <div className="justify-self-center mt-4">
            <>
              {watchLater?.length !== 0 ? (
                <>
                  <h1 className="text-xl font-bold">Watch Later</h1>
                  <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1">
                    {watchLater?.map((item: ISavedResp) => (
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

export default WatchLaterPage;
