import useFetchPokemon from "@/hooks/useRequest";
import { Outfit } from "next/font/google";
import Image from "next/image";
import { Pokemon } from "pokenode-ts";
import PokeballSpinner from "../Spinner/pokeball";

const outfit = Outfit({
  weight: "600",
  subsets: ["latin"],
});

type SimpleCardProps = {
  pokemon: any;
  clickCallback: (pokemonDetails: Pokemon) => void;
};

const SimpleCard = ({ pokemon, clickCallback }: SimpleCardProps) => {
  const { result, error } = useFetchPokemon(pokemon.name);
  if (error || !result) {
    return (
      <div className="shadow-xl rounded-lg text-center relative group border-2 hover:border-gray-400 cursor-pointer max-w-sm h-[166px] bg-white">
        <PokeballSpinner />
      </div>
    );
  }
  return (
    <div
      className="shadow-xl rounded-lg text-center relative group border-2 hover:border-gray-400 cursor-pointer max-w-sm bg-white"
      onClick={() => clickCallback(result)}
    >
      <Image
        className="m-auto group-hover:scale-110 rendering-pixelated"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.id}.png`}
        alt={result.name}
        width={96}
        height={96}
      />
      <h2 className="capitalize font-bold pokemon-font mb-2">{result.name}</h2>
      <p className="absolute top-2 right-2 bg-[#f6f8fc] rounded-xl px-2 pokemon-font">
        #{result.id}
      </p>
      <div className="types mb-2 mt-2">
        {result.types.map((type: any) => (
          <span
            key={type.type.name}
            className={`type ${type.type.name} pokemon-font mb-2`}
          >
            {type.type.name}
          </span>
        ))}
      </div>
      <style jsx>{`
        .types {
          display: flex;
          justify-content: center;
        }

        .type {
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          color: #fff;
          font-size: 12px;
          margin-right: 4px;
          padding: 4px 8px;
          text-transform: capitalize;
        }

        .pokemon-font {
          font-family: ${outfit.style.fontFamily};
        }

        .sprite-image {
          image-rendering: pixelated;
        }

        .type.normal {
          background-color: #a8a77a;
        }

        .type.fire {
          background-color: #ee8130;
        }

        .type.water {
          background-color: #6390f0;
        }

        .type.electric {
          background-color: #f7d02c;
        }

        .type.grass {
          background-color: #7ac74c;
        }

        .type.ice {
          background-color: #96d9d6;
        }

        .type.fighting {
          background-color: #96d9d6;
        }

        .type.poison {
          background-color: #a33ea1;
        }

        .type.ground {
          background-color: #e2bf65;
        }

        .type.flying {
          background-color: #a98ff3;
        }

        .type.psychic {
          background-color: #f95587;
        }

        .type.bug {
          background-color: #a6b91a;
        }

        .type.rock {
          background-color: #b6a136;
        }

        .type.ghost {
          background-color: #735797;
        }

        .type.dragon {
          background-color: #6f35fc;
        }

        .type.dark {
          background-color: #705746;
        }

        .type.steel {
          background-color: #b7b7ce;
        }

        .type.fairy {
          background-color: #d685ad;
        }
      `}</style>
    </div>
  );
};

export default SimpleCard;
