import React, { Component } from 'react';
const Person =(props) => {
    return(
<div className="xl:basis-1/4 sm:basis-2/5 basis-4/5  border-4 border-gray-800 rounded-lg p-2 flex flex-col m-2">
<div><img src={props.img} className="w-auto h-auto rounded-md" alt=""/></div>
<div className="xl:text-2xl text-base text-green-200">{props.position}</div>
<p className="xl:text-xl text-lg p-4">{props.feedback}</p>
</div>
);
};
export default Person;