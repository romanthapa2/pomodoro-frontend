import React, { useState } from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Alert from "@mui/material/Alert";

interface formState {
  email: string;
  password: string;
}
const Login = () => {
  const history = useNavigate();
  const [value, setvalue] = useState<formState>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: value.email, password: value.password }),
    });
    const json = await response.json();

    if (json.success) {
      Cookies.set("accessToken", json.data.accessToken);
      history("/");
    } else {
      setError(json.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };
  // sets the value when user types in the input form
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setvalue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <div className="h-screen gap-y-4 text-white bg-black flex justify-center items-center flex-col">
      <div className="h-8">
      {error && (
        <div className="w-80">
          <Alert severity="error">{error}</Alert>
        </div>
      )}
      </div>

      <div className="flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold">Pomofocus</h1>
        <h1 className="font-bold text-lg">Login</h1>
      </div>

      <div className=" text-black h-[60%] w-96 bg-white rounded-md flex flex-col justify-center items-center">
        <Button className=" mb-3 bg-white text-black border w-5/6 hover:bg-transparent shadow-md">
          <FcGoogle className="text-lg mr-2" />
          Login with Google
        </Button>
        <div className="flex items-center w-5/6 mb-2">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-700">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <form className="w-5/6" onSubmit={handleSubmit}>
          <span className="text-slate-500 text-sm">Email</span>
          <div className="flex flex-col  mb-3 mt-1">
            <input
              name="email"
              type="email"
              minLength={3}
              className=" p-2 bg-slate-100 rounded-md focus:outline-none"
              placeholder="example@gmail.com"
              onChange={onChange}
            />
          </div>
          <span className="text-slate-500 text-sm">Password</span>
          <div className="flex flex-col mb-5 mt-1">
            <input
              name="password"
              type="password"
              minLength={5}
              placeholder="password"
              className=" p-2 bg-slate-100 rounded-md focus:outline-none"
              onChange={onChange}
            />
          </div>
          <Button
            type="submit"
            className="p-2 w-full text-white bg-black rounded-md"
          >
            Log in with Email
          </Button>
        </form>
      </div>
      <div className="flex">
        <h2 className="underline">Forgot Password</h2>
      </div>
    </div>
  );
};

export default Login;
