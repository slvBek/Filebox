import React, { Component } from "react";
import { ROOT_FOLDER } from "../Hooks/useFolder";
import {Link} from 'react-router-dom';
const BreadCrumbs = ({ currentFolder }) => {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) {
      
    
    console.log("hey",currentFolder);
    path = [...path, ...currentFolder.path]};

  return (
    <div className="p-1 m-1">
      {path.map((x, i) => (
          <span className="m-1 p-1" key={i}>
              <Link className="text-gray-300 hover:text-sky-200 text-2xl" to ={x.id===null ? "/task" : `/folder/${x.id}`}>{x.name}</Link>
          </span>))}
    </div>
  );
};
export default BreadCrumbs