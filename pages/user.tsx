import { getSession, useUser } from '@auth0/nextjs-auth0'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Jelly } from '@uiball/loaders';
import Image from 'next/image';
import React from 'react'
import useSWR from 'swr';
import fetcher from '../helper/fetcher';
import Poster from '../components/Poster'
import { v4 as uuidv4 } from 'uuid'

const UserPage = () => {
    const { user,isLoading } = useUser();
    console.log(user);

    const { data:favourites } = useSWR(`/api/favorite/${user?.email}`,fetcher);
    console.log(favourites)
    
  return (
    <main className='flex min-h-[90vh] justify-center items-center'>
        {isLoading ? (
            <div className='h-full w-full grid place-items-center'>
                <Jelly color="#007CEF"  />

            </div>
        ):(
            <div className='flex flex-col items-center'>
                <Image src={user?.picture || ""} alt="profile-picture" width={100} height={100} className="rounded-full " objectFit="cover" />
                <div className='mt-2 space-y-2 text-center'>
                    <p className='text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm text-gray-500'>{user?.email}</p>
                </div>
                <div className='justify-self-start mt-4'>
                    <h1 className='text-xl font-bold'>Favourite Anime</h1>
                    {favourites?.map((item:any)=>(
                        
                        <div className='' key={uuidv4()}>
                            <h1>{item.title}</h1>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </main>
  )
}

export const getServerSideProps = withPageAuthRequired();


export default UserPage


