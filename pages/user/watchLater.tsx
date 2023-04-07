import React from "react";
import useSWR from "swr";
import Saved from "../../components/Saved";
import UserProfile from "../../components/UserProfile";
import fetcher from "../../helper/fetcher";
import { ISavedResp } from "../../interface";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../components/Loader";
import Container from "../../components/Container";
import { animeTypes, bookTypes } from "../api/anime";
import { api } from "../../utils/api";

const WatchLaterPage = () => {
  const { data: watchLater } = api.watchLater.getWatchLater.useQuery();
  console.log(watchLater);
  return (
    <Container>
      <main className="flex min-h-[90vh] justify-center items-center ">
        {!watchLater ? (
          <Loader />
        ) : (
          <div className="flex flex-col items-center">
            <UserProfile />

            <div className="justify-self-center mt-4">
              <>
                {watchLater?.length !== 0 ? (
                  <>
                    <h1 className="text-xl font-bold text-primary">Watch Later</h1>
                    <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1">
                      {watchLater?.filter((item:ISavedResp)=>animeTypes.includes(item.type.toLowerCase())).map((item: ISavedResp) => (
                        <Saved item={item} key={uuidv4()} />
                      ))}
                    </div>
                    <h1 className="text-xl font-bold text-primary mt-4">Read Later</h1>
                    <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1">
                      {watchLater?.filter((item:ISavedResp)=>bookTypes.includes(item.type.toLowerCase())).map((item: ISavedResp) => (
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
    </Container>
  );
};

export default WatchLaterPage;
