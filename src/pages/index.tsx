import Card from "@/components/Card";
import DetailedCard from "@/components/DetailedCard";
import Search from "@/components/Search";
import PokeballSpinner from "@/components/Spinner/pokeball";
import { PrefetchedPokemon } from "@/types/pokemon";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home = () => {
  const [currentPokemonName, setCurrentPokemonName] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [style, setStyle] = useState<string>("h-screen w-screen sticky");
  const [pokemon, setPokemon] = useState<Array<PrefetchedPokemon>>();
  const [filteredPokemon, setFilteredPokemon] = useState<
    Array<PrefetchedPokemon> | undefined
  >();

  useEffect(() => {
    const initializePokemonFetch = async () => {
      const url = "https://pokeapi.co/api/v2/pokemon/?limit=897";
      const response = await fetch(url);
      const responseJSON = await response.json();
      const pokemonData = responseJSON.results.map(
        (currPokemon: any, index: number) => {
          return { id: index + 1, name: currPokemon.name, types: [] };
        }
      );
      setPokemon(pokemonData);
      getAllPokemonTypes();
    };

    const getAllPokemonTypes = async () => {
      const typePromises = [];
      for (let i = 1; i <= 18; i++) {
        const url = `https://pokeapi.co/api/v2/type/${i}`;
        typePromises.push(fetch(url).then((res) => res.json()));
      }
      const allTypes = await Promise.all(typePromises);
      allTypes.forEach((type: any) => {
        type.pokemon.forEach((pokemon: any) => {
          const pokemonID = pokemon.pokemon.url
            .replace("https://pokeapi.co/api/v2/pokemon/", "")
            .replace("/", "");
          if (pokemon) {
            setPokemon((prevState) => {
              const updatedPokemon = prevState?.map((pokemon, i) => {
                if (i === parseInt(pokemonID) - 1) {
                  if (!pokemon.types.includes(type.name)) {
                    pokemon.types.unshift(type.name);
                    return {
                      ...pokemon,
                      types: [...pokemon.types],
                    };
                  }
                }
                return pokemon;
              });
              return updatedPokemon;
            });
          }
        });
      });
      setLoading(false);
      // window.scrollTo(0, 0);
    };

    initializePokemonFetch();
  }, []);

  const clickCallback = (name: string) => {
    setCurrentPokemonName(name);
    setStyle(`h-screen w-screen sticky slide-in`);
  };

  const onDetailedCardClose = () => {
    setStyle(`h-screen w-screen sticky slide-out`);
  };

  return (
    <div>
      <div className={!loading ? "hidden" : "visible h-[10000vh] w-full"}>
        <PokeballSpinner />
      </div>
      <div className="bg-[#f6f8fc]">
        <div className="h-fit mr-4 min-h-screen">
          <Head>
            <title>Pokedex</title>
          </Head>
          <Search data={pokemon} setFilteredData={setFilteredPokemon} />
          <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-2 m-2 h-screen">
            {filteredPokemon?.map((pokemon) => (
              <Card
                pokemon={pokemon}
                clickCallback={clickCallback}
                key={pokemon.id}
              />
            ))}
          </div>
          {currentPokemonName && (
            <div className={style}>
              <DetailedCard
                name={currentPokemonName}
                closeCallback={onDetailedCardClose}
              />
            </div>
          )}
        </div>
        <style jsx>{`
          .slide-out {
            animation: slideOut ease-in-out 1s;
            animation-fill-mode: forwards;
          }

          @keyframes slideOut {
            0% {
              bottom: 0%;
            }
            100% {
              bottom: -100vh;
              visibility: hidden;
            }
          }

          .slide-in {
            animation: slideIn ease-in-out 1s;
            animation-fill-mode: forwards;
          }

          @keyframes slideIn {
            0% {
              bottom: -100vh;
            }
            100% {
              bottom: 0%;
            }
          }
        `}</style>
      </div>
      )
    </div>
  );
};

export default Home;
