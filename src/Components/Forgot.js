import React, { Component, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Link, useNavigate } from "react-router-dom";
const Forgot = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { forgotPassword } = useAuth();
  const [error, setError] = useState("");
  const [errStyle, setErrStyle] = useState({ display: "none" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrStyle({ display: "none" });
let em = email;
em = em.trim();
if(!em){
  setError("email not found");
  setErrStyle({display:"block"})
  setEmail("");
  return;
}
    try {
      setError("");
      setLoading(true);
      setErrStyle({ display: "none" });
      await forgotPassword(email);
      setStatus("Password reset email sent");
    } catch {
      setError("Error reseting password");
      setErrStyle({ display: "block" });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center">

        <form
          onSubmit={(e)=>handleSubmit(e)}
          className="md:basis-1/2 basis-4/5 flex flex-col text-center flex-wrap bg-gray-200 p-2 loginClass"
        >
              <div style={errStyle} className="text-red-600 text-2xl text-center bg-gray-100">{error}</div>
          <div className="text-5xl m-2 loginClass text-gray-500">Forgot Password</div>
          <div className="flex flex-col flex-wrap loginClass">
            <label className="block m-1 text-2xl text-gray-800 loginClass" for="email">
              Email
            </label>
            <div className="border-2 border-gray-100 m-1 loginClass">
              <input
                className="p-3 text-xl text-gray-800 w-4/5 border-gray-300 border-2 focus:border-gray-500 outline-none loginClass"
                type="email"
                id="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`enter your email address`}
              />
            </div>
          </div>
          <div className="loginClass">
            <button
               type="submit" className="text-3xl text-gray-800 px-2.5 py-1 rounded-lg m-4 border-2 border-sky-400 hover:bg-sky-200 loginClass"
              disabled={loading}
            >
              Reset Password
            </button>
          </div>
          <div className="flex flex-col text-center flex-wrap loginClass">
            <div className="m-1 loginClass">
              <Link to="/login" className="no-underline text-red-700 text-xl loginClass">
                login
              </Link>
            </div>
            <div className="m-1 loginClass">
              <Link to="/signup" className="no-underline text-red-700 text-xl loginClass">
                signup
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Forgot;