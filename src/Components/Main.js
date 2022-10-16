import React, { Component } from 'react';
import {Link} from 'react-router-dom';
const Main = () => {
    return(
        <div className="text-center m-2"><button style={{ marginTop: "30px" }} className="text-4xl  rounded-lg "><Link className='hover:bg-blue-900 rounded-lg border-2 border-blue-300 text-gray-200 no-underline hover:text-gray-200 px-2' to="/task">Lets start</Link></button></div>
    );
}
export default Main;