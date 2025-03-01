import { ForgotPasswordButton, BlueButton, GreenButton } from "./buttons";
import AcmeLogo from "../logo";
import PwdInput from "./pwdinput";
import Link from "next/link";

export default function SignUpForm() {
    
    return (
      <div className=" font-extrabold bg-white w-full rounded-lg flex flex-col mx-4 py-8 gap-3 items-center">
        <div>
          <AcmeLogo />
        </div>
        <p>Create a new account</p>
        <form className="flex flex-col  gap-3">
          
          <input type="text" placeholder="Username" id="username" className="border border-zinc-200 rounded-lg px-4 py-2"/>
          <input type="text" placeholder="Email" id="email" className="border border-zinc-200 rounded-lg px-4 py-2"/>
          <input type="password" placeholder="Password" className="border border-zinc-200 rounded-lg px-4 py-2"/>
          <PwdInput/>
          {/* will be implemented in the next section */}
          <Link href='/home'>
          <BlueButton value="Sign Up"/>
          </Link>
        </form>
        <div className="mt-4 pt-8 border-t border-zinc-200 w-full h-full flex items-center justify-center">
          <GreenButton value="I already have an account" href="/login"/>
        </div>
      </div>
    );
  }