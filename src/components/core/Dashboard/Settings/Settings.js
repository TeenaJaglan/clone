 import React from 'react'
import Updateprofilepicture from './Updateprofilepicture'
import Updateprofile from './Updateprofile'
import Changepassword from './Changepassword'
import DeleteAccount from './DeleteAccount'
 
 export default function Settings() {
   return (
     <div className=' w-9/12 mx-auto' >
       <Updateprofilepicture/>
       <Updateprofile/>
       <Changepassword/>
       <DeleteAccount/>
     </div>
   )
 }
 