import React from 'react'
import HighlightText from '../core/HomePage/HighlightText'

export default function Quote() {
  return (
    <div className='w-full p-4 mx-auto text-white text-center text-4xl font-bold '>
        <p>We are passionate about revolutionizing the way we learn. Our innovative platform 
            <span><HighlightText text=" combines technology "/></span> , <span>
                 <span className='bg-gradient-to-r from-pink-700 via-pink-200 to-yellow-50 bg-clip-text text-transparent'>expertise</span>
            </span>
            <span> ,  and community to create an </span>
            <span>
            <span className='bg-gradient-to-r from-pink-700 to-yellow-50 bg-clip-text text-transparent'> unparalleled educational experience.</span>
            </span>
        </p>
      
    </div>
  )
}
