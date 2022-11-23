import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../context";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("nickpugsley83@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [loading, setLoading] = useState(false);

  // state
  const {
    state: { user },
    dispatch,
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

      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });

      dispatch({ type: "LOGIN", payload: data });
      // save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));

      router.push("/user");
      // setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-200 min-h-screen">
        <div className="text-center py-4 px-4 md:py-16 md:px-8 mb-8 bg-purple-500 font-bold text-white">
          <h1 className="text-6xl">Login Page</h1>
          <p className="text-3xl py-5">Get yo learning on</p>
        </div>

        {/* register form */}
        <div className="container mx-auto sm:px-4 col-md4 md:mx-1/3 pb-5 rounded-md">
          <form
            className="input-group input-group-vertical rounded-full"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="input input-bordered w-full max-w-xs mt-5 mx-auto "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              required
            />
            <input
              type="password"
              className="input input-bordered w-full max-w-xs mt-5 mx-auto"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
            />

            <button
              className="btn w-full max-w-xs mt-5 mx-auto text-lg"
              disabled={!email || !password || loading}
            >
              {loading ? (
                <ArrowPathIcon className="animate-spin h-8 w-8" />
              ) : (
                "LOGIN"
              )}
            </button>
          </form>

          <p className="text-center py-3">
            Sign Up{" "}
            <Link href="/register">
              <a className="text-blue-600">Here</a>
            </Link>
          </p>

          <p className="text-center ">
            <Link href="/forgot-password">
              <a className="text-blue-600">Forgot password?</a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
