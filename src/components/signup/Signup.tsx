import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Alert from "@mui/material/Alert";

interface formState {
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const history = useNavigate();
  const [value, setvalue] = useState<formState>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/user/signup`, {
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setvalue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <div className="h-screen bg-black text-white flex justify-center flex-col items-center overflow-hidden space-y-4">
      <div className="h-8">
      {error && (
        <div className="w-80">
          <Alert severity="error">{error}</Alert>
        </div>
      )}
      </div>

      <h1 className="text-4xl font-bold">Pomofocus</h1>
      <h1 className="font-bold">Create Account</h1>
      <div className="h-[55%] bg-white text-black w-96 rounded-md flex flex-col justify-center items-center">
        <Button className=" mb-3 bg-white text-black border w-5/6  hover:bg-transparent shadow-md">
          <FcGoogle className="text-lg mr-2" />
          Signup with Google
        </Button>

        <div className="flex items-center w-5/6 mb-2">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-700">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        <form className="w-5/6" onSubmit={handleSubmit}>
          <span className="text-slate-500 text-sm">EMAIL</span>
          <div className="flex flex-col mt-1">
            <input
              name="email"
              type="email"
              minLength={3}
              className="p-2 border rounded-md bg-slate-100 focus:outline-none"
              placeholder="example@gmail.com"
              onChange={onChange}
              required
            />
          </div>
          <span className="text-slate-500 text-sm">Password</span>
          <div className="flex flex-col mb-5 mt-1">
            <input
              name="password"
              type="password"
              minLength={6}
              placeholder="password"
              className=" p-2 bg-slate-100 rounded-md focus:outline-none"
              onChange={onChange}
            />
          </div>
          <Button
            type="submit"
            className="w-full text-white bg-black rounded-lg mt-6"
          >
            Sign up with Email
          </Button>
        </form>
      </div>
      <div className="flex w-full  ml-[80%] items-center">
        <h1 className="">
          Already have an account?
          <Link className="underline" to={"/login"}>
            Log in
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Signup;
