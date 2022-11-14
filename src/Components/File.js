import React, { Component } from "react";
import {Link} from 'react-router-dom';
import ffile from "./file.png"
const File = ({ file }) => {

  function stringer(a){
    let aa = "";
    if(a.length<10){
    return a;
    }
    for(let i =0; i<15;i++){
        aa += a[i];
    }
    aa+="...";
    return aa;
    }
  return (
    <div className="flex flex-wrap flex-col m-2 p-2">
      <div className="flex flex-wrap justify-center"><img src={ffile}  className="w-10 h-10" alt="" />
        </div>
    <a href={file.url} target="_blank" className="text-2xl text-gray-200 hover:text-sky-200 no-underline">
      {stringer(file.name)}
    </a>
    </div>
  );
};

export default File;