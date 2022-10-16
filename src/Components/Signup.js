import React, { Component, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [errStyle, setErrStyle] = useState({ display: "none" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setErrStyle({ display: "none" });
    let em = email;
    em = em.trim();
    let pss = password;
    pss = pss.trim();
    if (!em || !pss) {
      setError("email or password not found");
      setErrStyle({ display: "block" });
      setEmail("");
      setPassword("");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setErrStyle({ display: "block" });
      return;
    }
    try {
      setError("");
      setLoading(true);
      setErrStyle({ display: "none" });
      await signup(email, password);
      navigate("/dashboard");
    } catch {
      setError("Error signing up");
      setErrStyle({ display: "block" });
    }
    console.log("done");
    setLoading(false);
  };
  return (
    <>
    <div className="din">
      <div className="flex flex-row flex-wrap justify-center ">
      
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="md:basis-1/2 basis-4/5 flex flex-col text-center flex-wrap bg-gray-200 p-2 loginClass"
        >
             <div style={errStyle} className="text-red-600 text-2xl text-center bg-gray-100">{error}</div>
          <div className="text-5xl m-2 loginClass text-gray-500">Signup</div>
          <div className="flex flex-col flex-wrap loginClass">
            <label
              className="block m-1 text-2xl text-gray-800 loginClass"
              for="email"
            >
              Email address
            </label>
            <div className="border-2 border-gray-100 m-1 loginClass">
              <input
                className="p-3 text-xl text-gray-800 w-4/5 border-gray-300 border-2 focus:border-gray-500 outline-none loginClass"
                type="email"
                id="email"
                placeholder={`enter your email`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
          </div>

          <div className="flex flex-col flex-wrap loginClass">
            <label
              className="block m-1 text-2xl text-gray-800 loginClass"
              for="password"
            >
              Password
            </label>
            <div className="border-2 border-gray-100 m-1 loginClass">
              <input
                className="p-3 text-xl text-gray-800 w-4/5 border-gray-300 border-2 focus:border-gray-500 outline-none loginClass"
                type="password"
                id="password"
                placeholder={`enter your password`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
          </div>

          <div className="flex flex-col flex-wrap loginClass">
            <label
              className="block m-1 text-2xl text-gray-800 loginClass"
              for="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="border-2 border-gray-100 m-1 loginClass">
              <input
                className="p-3 text-xl text-gray-800 w-4/5 border-gray-300 border-2 focus:border-gray-500 outline-none loginClass"
                type="password"
                id="confirmPassword"
                placeholder="enter your confirm password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="loginClass">
            <button
              type="submit"
              className="text-3xl text-gray-800 px-2.5 py-1 rounded-lg m-4 border-2 border-red-400 hover:bg-red-200 loginClass" disabled={loading}
            >
              signup
            </button>
          </div>
          <div className="flex flex-col text-center flex-wrap loginClass">
            <div className="m-1 loginClass">
              <Link
                to="/forgot"
                className="no-underline text-red-700 text-xl loginClass"
              >
                forgot password
              </Link>
            </div>
            <div className="m-1 loginClass">
              <Link
                to="/login"
                className="no-underline text-red-700 text-xl loginClass"
                display={loading}
              >
                login
              </Link>
            </div>
          </div>
        </form>
      </div>
      </div>
    </>
  );
};
export default Signup;