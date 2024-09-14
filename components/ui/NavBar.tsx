import Image from 'next/image'
import React from 'react'


function NavBar() {
  return (
    <div className='flex gap-5 justify-center items-center px-7 py-1 font-bold leading-[154] max-md:flex-wrap max-md:px-5'>
        <div className='flex gap-1.5 justify-center self-stretch my-auto text-2xl tracking-tighter text-neutral-700'>
          <Image 
            src="/images/utopia_black.png"
            className='shrink-0 my-auto aspect-square cursor-pointer w-[23px]'
            sizes="100vw"
            style={{ width: "20%", height:"auto" }}
            width={0}
            height={0}
            alt="Utopia_Logo"
          />        
        </div>
    </div>
  )
}

export default NavBar