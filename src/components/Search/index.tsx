import { PrefetchedPokemon } from "@/types/pokemon";
import { useEffect, useState } from "react";

type Props = {
  data: Array<PrefetchedPokemon> | undefined;
  setFilteredData: any;
};

const Search = ({ data, setFilteredData }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (data && searchTerm.trim() !== "") {
        const filteredData = data.filter((pokemon) =>
          pokemon.name.includes(searchTerm.trim().toLowerCase())
        );
        setFilteredData(filteredData);
      } else {
        setFilteredData(data);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [data, searchTerm, setFilteredData]);

  return (
    <div className="mx-auto ml-2 mr-2 border-2 border-black rounded-lg">
      <input
        type="text"
        placeholder="Search for a Pokemon"
        value={searchTerm}
        onChange={handleSearchChange}
        className="block w-full p-2 text-xl placeholder-gray-500 border-gray-300 rounded-lg shadow outline-none"
      />
    </div>
  );
};

export default Search;
