import React from 'react'

interface InputComponentProps {
  label : string ,
  placeholder : string ,
  onChange : (e : React.ChangeEvent<HTMLInputElement>) => void ,
  type ? : string
  value ?  : string
}



const InputComponent = ({label , placeholder , onChange , type , value }  :InputComponentProps ) => {
  return (
    <div>
      <label htmlFor={label}>
        <span className="text-sm font-semibold pt-2" > {label} </span>
        <input value={ value } type={type || "text"} id={label} className=" p-2 my-2 mt-0.5 w-full border-2 border-black shadow-[4px_4px_0_0] focus:ring-2 focus:ring-yellow-300 sm:text-sm" placeholder={placeholder} onChange={onChange} />
      </label>
    </div>
  )
}





export default InputComponent ;
