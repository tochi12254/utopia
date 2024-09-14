import Image from 'next/image'
import React from 'react'
import { Button } from './button'

function Footer() {
  return (
    <div className='flex gap-x-5 justify-center items-center px-7 py-1 font-bold leading-[154] max-md:flex-wrap max-md:px-5 mt-10'>
    
          <Button variant="ghost" className='transition  text-zinc-500 dark:text-zinc-400 px-8 rounded-full '>
            Terms
          </Button>
          <Button variant="ghost" className='transition  text-zinc-500 dark:text-zinc-400 px-8 rounded-full'>
            Policy
          </Button>    
    </div>
  )
}

export default Footer