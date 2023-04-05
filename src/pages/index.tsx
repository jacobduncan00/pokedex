import Card from "@/components/Card";
import DetailedCard from "@/components/DetailedCard";
import Search from "@/components/Search";
import PokeballSpinner from "@/components/Spinner/pokeball";
import Head from "next/head";
import { Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";

const Home = () => {
  const [currentPokemonDetails, setCurrentPokemonDetails] = useState<Pokemon>();
  const [loading, setLoading] = useState<boolean>(true);
  const [style, setStyle] = useState<string>("h-screen w-screen sticky");
  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "infinitePokemon",
    async ({ pageParam = 0 }) =>
      await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${pageParam}`
      ).then((result) => result.json()),
    {
      getNextPageParam: (lastPage, pages) => {
        console.log("pages", pages);
        if (lastPage.next) {
          return pages.length * 30;
        }
      },
    }
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const clickCallback = (pokemon: Pokemon) => {
    setCurrentPokemonDetails(pokemon);
    setStyle(`h-screen w-screen sticky slide-in`);
  };

  const onDetailedCardClose = () => {
    setStyle(`h-screen w-screen sticky slide-out`);
  };

  return (
    <>
      {loading ? (
        <>
          <PokeballSpinner />
        </>
      ) : (
        <div className="bg-[#f6f8fc]">
          <div className="h-fit h-min-screen mr-4">
            <Head>
              <title>Pokedex</title>
            </Head>
            <Search />
            {status === "success" && (
              <InfiniteScroll
                dataLength={data?.pages.length * 30}
                next={fetchNextPage}
                hasMore={hasNextPage!}
                loader={<PokeballSpinner />}
              >
                <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-2 m-2">
                  {data?.pages.map((page) => (
                    <>
                      {page.results.map(
                        (pokemon: { name: string; url: string }) => (
                          <Card
                            pokemon={pokemon}
                            clickCallback={clickCallback}
                            key={pokemon.url}
                          />
                        )
                      )}
                    </>
                  ))}
                </div>
              </InfiniteScroll>
            )}
            {currentPokemonDetails && (
              <div className={style}>
                <DetailedCard
                  details={currentPokemonDetails}
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
                bottom: 0;
              }
              100% {
                bottom: -100vh;
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
                bottom: 0;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default Home;
