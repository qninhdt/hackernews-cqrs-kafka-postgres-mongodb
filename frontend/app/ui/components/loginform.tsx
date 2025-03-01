"use client";
import { GreenButton, ForgotPasswordButton, BlueButton } from "./buttons";
import AcmeLogo from "../logo";
import Link from "next/link";
import User from "@/app/lib/definitions";
import { FormEvent, use, useContext } from "react";
import { useUser } from "@/app/lib/currentUserContext";
import { redirect } from "next/navigation";
const defaultUser: User = {
  username: "admin",
  email: "a@a.com",
  password: "pswd",
  id: 123,
  avatar: "/ganyu.jpeg",
};

export default function LoginForm() {
  const setUser = useUser().setUser;
  const handleClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser(defaultUser);
    redirect("/home");
  };
  return (
    <div className=" font-extrabold bg-white w-full rounded-lg flex flex-col mx-4 py-8 gap-3 items-center">
      <div>
        <AcmeLogo />
      </div>
      <form onSubmit={(e) => handleClick(e)} className="flex flex-col  gap-3">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border border-zinc-200 rounded-lg px-4 py-2"
        />

        <input
          type="password"
          placeholder="password"
          className="border border-zinc-200 rounded-lg px-4 py-2"
        />
        {/* will be implemented in the next section */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out"
        >
          Log In
        </button>
        <ForgotPasswordButton />
      </form>
      <div className="mt-4 pt-8 border-t border-zinc-200 w-full h-full flex items-center justify-center">
        <GreenButton value="Create an account" href="/signup" />
      </div>
    </div>
  );
}
