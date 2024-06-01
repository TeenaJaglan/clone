 import React from 'react'
import ContactDetails from '../components/common/ContactPage/ContactDetails'
import ContactForm from '../components/common/ContactPage/ContactForm'
 import ReviewSlider from '../components/common/ReviewSlider';
 import Footerfoot from "../components/common/Footer";
 export default function Contact() {
   return (
     <div className=' mx-auto my-[5rem] justify-evenly '>
      <div className='flex flex-row mb-8 '>
       <ContactDetails/>
       <ContactForm/></div>
       <ReviewSlider/>
       <Footerfoot/>
     </div>
   )
 }
 