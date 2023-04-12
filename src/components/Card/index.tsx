import { PrefetchedPokemon } from "@/types/pokemon";
import Image from "next/image";

type SimpleCardProps = {
  pokemon: PrefetchedPokemon;
  clickCallback: (pokemonName: string) => void;
};

const SimpleCard = ({ pokemon, clickCallback }: SimpleCardProps) => {
  return (
    <div
      className="shadow-xl rounded-lg text-center relative group border-2 hover:border-gray-400 cursor-pointer max-w-sm bg-white max-h-[174px]"
      onClick={() => clickCallback(pokemon.name)}
    >
      <Image
        className="m-auto group-hover:scale-110 ease-in-out duration-200 rendering-pixelated"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt={pokemon.name}
        priority={true}
        width={96}
        height={96}
      />
      <h2 className="capitalize font-bold mb-2">{pokemon.name}</h2>
      <p className="absolute top-2 right-2 bg-[#f6f8fc] rounded-xl px-2 font-bold">
        #{pokemon.id}
      </p>
      <div className="types mb-2">
        {pokemon.types.map((type: any) => (
          <span key={type} className={`type ${type} font-bold mb-2`}>
            {type}
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
