import React, { Component } from 'react';
import {Link} from 'react-router-dom';
const Main = () => {
    return(
        <div>
        <p className="text-lime-200 text-2xl text-center">after storing millions of people's memories,precious</p>
        <p className="text-lime-200 text-2xl text-center">things with our advanced access features!</p>
        <p className="text-lime-200 text-2xl text-center">so now allow us to serve you</p>
        <div className="text-center m-2"><button className="text-4xl  rounded-lg "><Link className='hover:bg-blue-900 rounded-lg border-2 border-blue-300 text-gray-200 no-underline hover:text-gray-200 px-2' to="/task">Lets start</Link></button></div>
    </div>
    );
}
export default Main;