import React from 'react'

const Container = ({ children }: { children:React.ReactNode }) => {
  return (
    <div className='max-w-7xl mx-auto p-2'>
        {children}
    </div>
  )
}

export default Container