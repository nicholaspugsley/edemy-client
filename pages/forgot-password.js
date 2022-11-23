import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  // state
  const [email, setEmail] = useState("nickpugsley83@gmail.com");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // context
  const {
    state: { user },
  } = useContext(Context);

  // router
  const router = useRouter();

  // redirect if user is logged in
  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSuccess(true);
      const { data } = await axios.post("/api/forgot-password", { email });
      setLoading(false);
      toast("Check your email for the reset code");
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });

      setEmail("");
      setCode("");
      setNewPassword("");
      setLoading(false);
      toast("Great! Now you can login with your new password.");
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  return (
    <>
      <div className="bg-gray-200 min-h-screen">
        <div className="text-center py-4 px-4 md:py-16 md:px-8 mb-8 bg-purple-500 font-bold text-white">
          <h1 className="text-6xl">Forgot Password</h1>
        </div>

        <div className="container mx-auto sm:px-4 md:w-1/3 pr-4 pl-4 md:mx-1/3 pb-5">
          <form onSubmit={success ? handleResetPassword : handleSubmit}>
            <input
              type="email"
              className="block appearance-none w-full py-1 px-2 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded mb-4 p-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              required
            />
            {success && (
              <>
                <input
                  type="text"
                  className="block appearance-none w-full py-1 px-2 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded mb-4 p-6"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="secret code"
                  required
                />
                <input
                  type="password"
                  className="block appearance-none w-full py-1 px-2 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded mb-4 p-6"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="password"
                  required
                />
              </>
            )}
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading || !email}
            >
              {loading ? (
                <ArrowPathIcon className="animate-spin h-8 w-8" />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
