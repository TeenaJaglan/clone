import React from 'react'
import Template from '../components/core/Auth/Template'
import signup from "../assets/Images/signup.webp"

export default function SignUp() {
  return (
    <div>
      <Template title={"Join the millions learning to code with StudyNotion for free"} description1={"Build skills for today, tomorrow, and beyond."} description2={"Education to future-proof your career."} formType={"signupform"} image={signup}/>
    </div>
  )
}
