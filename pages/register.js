import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Register = () => {
  const [name, setName] = useState("nick");
  const [email, setEmail] = useState("nickpugsley83@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [loading, setLoading] = useState(false);

  // state
  const {
    state: { user },
  } = useContext(Context);
  // const { user } = state;

  // router
  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setLoading(true);

      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });
      // console.log("REGISTER RESPONSE", data);
      toast("Registration successful. Please login.");
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-200 min-h-screen">
        <div className="text-center py-4 px-4 md:py-16 md:px-8 mb-8 bg-purple-500 font-bold text-white">
          <h1 className="text-6xl">Register Page</h1>
          <p className="text-3xl py-5">Create an account today</p>
        </div>

        {/* register form */}
        <div className="container mx-auto sm:px-4 col-md4 md:mx-1/3 pb-5 ">
          <form
            className="input-group input-group-vertical "
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="input w-full max-w-xs mx-auto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              required
            />
            <input
              type="text"
              className="input w-full max-w-xs mt-5 mx-auto"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              required
            />
            <input
              type="password"
              className="input w-full max-w-xs mt-5 mx-auto"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
            />

            <button
              className="btn w-full max-w-xs mt-5 mx-auto text-lg"
              disabled={!name || !email || !password || loading}
            >
              {loading ? (
                <ArrowPathIcon className="animate-spin h-8 w-8" />
              ) : (
                "Submit"
              )}
            </button>
          </form>

          <p className="text-center p-6">
            Already registered login?{" "}
            <Link href="/login">
              <a className="text-blue-600">Here</a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
