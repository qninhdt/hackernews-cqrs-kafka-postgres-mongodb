"use client";

import { ForgotPasswordButton, BlueButton, GreenButton } from "./buttons";
import AcmeLogo from "../logo";
import PwdInput from "./pwdinput";
import Link from "next/link";
import { useState } from "react";


export default function SignUpForm() {
    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            const res = await fetch("http://localhost:3001/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, display_name: displayName, password }),
            });

            if (!res.ok) {
                throw new Error("Signup failed");
            }
            setSuccess("Signup successful! Redirecting to log in page...");
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        } catch (error) {
            setError("Signup failed. Please try again.");
            console.error("Signup error:", error);
        }
    };

    return (
      <div className=" font-extrabold bg-white w-full rounded-lg flex flex-col mx-4 py-8 gap-3 items-center">
        <div>
          <AcmeLogo />
        </div>
        <p>Create a new account</p>
        <form className="flex flex-col  gap-3" onSubmit={handleSubmit}>
          
          {/* <input type="text" placeholder="Username" id="username" className="border border-zinc-200 rounded-lg px-4 py-2"/>
          <input type="text" placeholder="Displayname" id="email" className="border border-zinc-200 rounded-lg px-4 py-2"/>
          <input type="password" placeholder="Password" className="border border-zinc-200 rounded-lg px-4 py-2"/> */}
        <input
        type="text"
        placeholder="Username"
        id="username"
        className="border border-zinc-200 rounded-lg px-4 py-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="text"
        placeholder="Displayname"
        id="displayname"
        className="border border-zinc-200 rounded-lg px-4 py-2"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border border-zinc-200 rounded-lg px-4 py-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
          <PwdInput/>
          {/* will be implemented in the next section */}
          <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2">
                    Sign Up
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
        <div className="mt-4 pt-8 border-t border-zinc-200 w-full h-full flex items-center justify-center">
          <GreenButton value="I already have an account" href="/login"/>
        </div>
      </div>


    );
  }


