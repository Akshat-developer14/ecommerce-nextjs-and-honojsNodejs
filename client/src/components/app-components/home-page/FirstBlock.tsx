import { Button } from '@/components/ui/button'
import React from 'react'

const FirstBlock = () => {
  return (
    <main className='bg-stone-200'>
        <div className='flex flex-col p-2 pt-10 sm:p-10 lg:p-20 w-full lg:w-2/4'>
      <span className='flex text-3xl md:text-6xl font-extrabold text-stone-950'>
        FIND CLOTHES THAT MATCHES YOUR STYLE
      </span>
      <span className='text-stone-700 mt-7'>
        Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
      </span>
      <span className='mt-10 flex justify-center lg:justify-start items-center'>
      <Button className='rounded-full w-full sm:w-auto p-6 px-14 bg-stone-950 text-stone-200 dark:hover:text-stone-950'>Shop Now</Button>
      </span>
      </div>
    </main>
  )
}

export default FirstBlock
