import React from 'react'
import Link from 'next/link'
import Logo from '../../../public/OLX-Logo-PNG-768x768.jpg'
import Image from 'next/image'

const createAd = () => {
  return (
    <div>
        <div className='flex bg-[#F7F8F8] border h-[70px] w-[100%]'>
        <div>
    <Link href="/sell"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" mt-6 ml-3 w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
</svg>
</Link>
</div>

       <div> 
       <Image
      src={Logo}
      alt="Picture of the author"
      className='h-[70px] w-[65px] ml-5'
       />
        </div>
    </div>

    <div>

    <div>
        <h1 className='flex flex-col items-center font-sans text-xl font-bold mt-3 text-[#2B5A5E]'>POST YOUR AD</h1>
    </div>

    <div className='ml-[250px] border mt-3 border-[#002F345B] h-[800px] w-[70%] rounded'>

    </div>

    </div>

    </div>
  )
}

export default createAd