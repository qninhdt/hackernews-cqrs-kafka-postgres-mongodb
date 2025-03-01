import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
export default function SearchBar() {
  return (
    <form>
      <div className="bg-white p-4 rounded-lg w-full md:w-1/2 flex flex-row items-center gap-4">
        <div className="bg-zinc-100 h-10 rounded-full focus:border-0 w-full px-4 flex flex-row gap-2 items-center focus:outline-amber-100">
        <MagnifyingGlassIcon width={15} height={15}/>
        <input
          type="text"
          className="w-full focus:outline-none"
          placeholder="Search"
        />
        </div>
      </div>
    </form>
  );
}
