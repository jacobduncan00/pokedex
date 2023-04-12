import useFetchPokemon from "@/hooks/useRequest";
import Image from "next/image";
import { useState } from "react";
import PokeballSpinner from "../Spinner/pokeball";

type DetailedCardProps = {
  name: string;
  closeCallback: () => void;
};

const DetailedCard = ({ name, closeCallback }: DetailedCardProps) => {
  const [useFallbackImage, setUseFallbackImage] = useState(false);
  const { result, error } = useFetchPokemon(name);
  if (error || !result) {
    return (
      <div className="shadow-xl rounded-lg text-center relative group border-2 hover:border-gray-400 cursor-pointer max-w-sm h-[166px] bg-white">
        <PokeballSpinner />
      </div>
    );
  }
  return (
    <div
      className={`type ${result.types[0].type.name} flex justify-center items-center h-screen`}
    >
      <div className="rounded-xl bg-white h-4/5 w-2/3 shadow-xl">
        <div
          className="absolute top-4 right-4 bg-white py-2 px-4 rounded-xl text-black cursor-pointer font-bold"
          onClick={() => closeCallback()}
        >
          X
        </div>
        <Image
          src={
            useFallbackImage
              ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.id}.png`
              : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${result.id}.gif`
          }
          alt="image"
          className="rendering-pixelated m-auto mt-12"
          width={175}
          height={175}
          onError={() => {
            if (!useFallbackImage) {
              setUseFallbackImage(true);
            }
          }}
        />
        <div className="text-center mt-12 w-1/2 m-auto">
          <p className="text-gray-300 font-bold">N°{result.id}</p>
          <h1 className="text-black capitalize text-3xl font-bold ">
            {result.name}
          </h1>
          <hr className="mt-4 mb-4" />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-black capitalize text-md font-bold mb-1">
                Height
              </div>
              <div className="bg-slate-200 rounded-xl py-0.5">
                {(result.height * 0.1).toFixed(2)}m
              </div>
            </div>
            <div>
              <div className="text-black capitalize text-md font-bold mb-1">
                Weight
              </div>
              <div className="bg-slate-200 rounded-xl py-0.5">
                {Math.floor(result.weight * 0.220462)}lbs
              </div>
            </div>
          </div>
          <div className="mt-4 mb-4" />
          <div className="text-black capitalize text-md font-bold mb-2 text-center">
            Abilities
          </div>
          {result.abilities.length >= 2 ? (
            <div className="grid grid-cols-2 gap-2">
              {result.abilities.map((ability: any) => {
                return (
                  <div
                    className="bg-slate-200 rounded-xl py-0.5 capitalize"
                    key={ability}
                  >
                    {ability.ability.name}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-slate-200 rounded-xl py-0.5 capitalize">
              {result.abilities[0].ability.name}
            </div>
          )}
          <div className="mt-4 mb-4" />
          <div className="flex flex-col justify-center items-center">
            <div className="text-black capitalize text-md font-bold mb-2 text-left">
              Stats
            </div>
            {result.stats.map((stat: any) => {
              return (
                <div key={stat} className="text-left">
                  {stat.stat.name} | {stat.base_stat}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style jsx>{`
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

export default DetailedCard;
