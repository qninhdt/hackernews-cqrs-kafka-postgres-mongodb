'use client';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
export default function PwdInput() {
    const [hide, setHide] = useState(true);
    const [value, setValue] = useState("");
    const handleChange = (inp: string) => {
        setValue(inp);
    };

    const inputType = hide ? "password" : "text";
  return (
    <div className="flex flex-col w-full relative justify-center">
      <input
        type={inputType}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Enter your password"
        className="border border-zinc-200 rounded-lg px-4 py-2"
      />
      <button type="button" className="absolute right-2 " onClick={() => setHide(!hide)}>
        {hide ? (
          <EyeIcon className="h-5 w-5" />
        ) : (
          <EyeSlashIcon className="h-5 w-5" />)}
      </button>
    </div>
  );
}