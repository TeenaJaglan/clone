import React from 'react'

export default function IconBtn({disabled,onClick,type,customClasses,outline=false,children,text}) {
  return (
    <button disabled={disabled} onClick={onClick} type={type} className = {`flex items-center cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900
    ${outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50" } ${customClasses}`} >
      {
        children?(<>
            <span className={`${outline && "text-yellow-50"}`}> {text} </span>
                        {children}
        </>):({text})
      }
    </button>
  )
}
