import Link from 'next/link';

export function BlueButton({value}:{value:string}) {
    return (
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out">
        {value}
      </button>
    );
}
export function ForgotPasswordButton() {
    return (
      <button type="submit" className=" text-blue-600 font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out">
        Forgotten Password?
      </button>
    );
}

export function GreenButton({value, href}:{value:string; href:string}) {
  return (
    <Link href={href} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out">
      {value}
    </Link>
  );
}

export function SideNavButton({value, href}:{value:string; href:string}) {
  return (
    <Link
      href = {href}
      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out"
    >
      {value}
    </Link>
  );

}