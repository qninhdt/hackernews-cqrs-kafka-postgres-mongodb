import SearchBar from "../ui/components/search/searchBar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search",
  };
export default function SearchPage() {
    return (
        <div>
            <SearchBar/>
        </div>
    )
}