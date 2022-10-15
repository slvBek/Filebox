import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ffolder from './folder.png';
const Folder =({folder})=>{
function stringer(a){
let aa = "";
if(a.length<10){
return a;
}
for(let i =0; i<8;i++){
    aa += a[i];
}
aa+="...";
return aa;
}
    return(
       <>
       <div className='flex flex-row flex-wrap'>
        <div className='text-lg sm:text-xl  border-2 border-gray-700 rounded-3xl px-4 py-2 m-2 text-gray-200 basis-20 text-center'>
        <div className="flex flex-wrap justify-center"><img src={ffolder}  className="w-10 h-10" alt="" />
        </div>
            <Link className='text-gray-200 no-underline hover:text-red-300' to ={folder.id===null ? "/task" : `/folder/${folder.id}`}>{stringer(folder.name)}</Link></div>
            </div>
        </>
    );
}
export default Folder;