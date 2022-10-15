import React, { Component, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import man from "./man.png";

const Dashboard = () => {
  var { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const [errStyle, setErrStyle] = useState({ display: "none" });

  if (currentUser === undefined) {
    currentUser = JSON.parse(localStorage.getItem("localKey"));
  }
  // filling localstorage
  localStorage.setItem("localKey", JSON.stringify(currentUser));
  // handles logout with the help of google firebase
  const handleLogout = () => {
    // setError("");
    // try {
    logout();
    console.log("hello logout");
    localStorage.removeItem("localKey");
    logout();
    try{
     logout();
    }
    catch {
      setError("Error signing out");
      setErrStyle({ display: "block" });
    }
  };

  return (
    <>
    <div className="text-center flex flex-wrap justify-center">
    <div className="border-2 border-gray-200 basis-1/2 p-4 rounded-lg">
      <div className="text-center flex flex-col flex-wrap">
        <div className="flex flex-wrap justify-center">
          <div className="text-center">
            <img src={man} className="w-60 h-60" />
          </div>
        </div>
        <div className="text-4xl text-gray-200 p-1 m-1">Profile Section</div>
        <div className="text-2xl text-sky-200 p-1 m-1">{`Your email`}</div>
        <div className="text-3xl text-sky-400 p-1 m-1">{currentUser.email}</div>
        <div className="text-center m-2">
          <button>
            <Link
              to="/task"
              className="text-4xl border-2 border-lime-800 rounded-lg px-6 hover:bg-slate-800  text-gray-200 hover:text-gray-200 no-underline"
            >
              Lets start
            </Link>
          </button>
        </div>
      </div>

      <div className="text-center m-4">
        <button type="submit" onClick={handleLogout}>
          <Link
            className="px-2.5 py-1 text-2xl text-gray-800 rounded-lg m-4 border-2 border-red-300 hover:bg-red-500 "
            style={{ textDecoration: "none", color: "white" }}
            to="/login"
          >
            Log Out
          </Link>
        </button>
      </div>

      </div>
      </div>
    </>
  );
};
export default Dashboard;