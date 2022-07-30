import { useUser } from '@auth0/nextjs-auth0'
import { Jelly } from '@uiball/loaders';
import Image from 'next/image';
import React from 'react'

const UserPage = () => {
    const { user,isLoading } = useUser();
    console.log(user)
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
                <div>
                    
                </div>
            </div>
        )}
    </main>
  )
}

export default UserPage