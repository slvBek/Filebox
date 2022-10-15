import React, { Component } from 'react';
const Input = (props)=>{
    return(
  <div className='flex flex-col flex-wrap'>
      <label className='block m-1 text-2xl text-gray-800' for={props.id}>{props.label}</label>
      <div className="border-2 border-gray-100 m-1">
      <input className='p-3 text-xl text-gray-800 w-4/5 border-gray-300 border-2 focus:border-gray-500 outline-none' type={props.id} id={props.id} placeholder={`enter your ${props.label}`}/>
      </div>
  </div>
    );
}
export default Input;