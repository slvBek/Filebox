import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../Logo.png";
const Navbar = () => {
  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="basis-1/12">
          <img src={logo} alt="" className="" />
        </div>
      </div>
      <div className="text-3xl font-bold m-2 text-sky-200 text-center">
        Filebox
      </div>
      <div className="flex flex-row justify-center">
        <div className="m-2"><Link className="no-underline text-3xl m-2 text-sky-200" to="/">Home</Link></div>
        {/* <div className="text-2xl m-2 text-sky-200">About</div> */}
        <div className="m-2"><Link className="no-underline text-3xl m-2 text-sky-200" to="/dashboard">Profile</Link></div>
      </div>
    </>
  );
};

export default Navbar;