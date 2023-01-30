import Card from "@/components/Card";
import Head from "next/head";
import { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
export default function Home() {
  const [res, setRes] = useState<any>([]);
  const [pokemons, setPokemons] = useState<any>([]);

  const fetchPokemons = async (url: string) => {
    const resp = await fetch(url);
    const data = await resp.json();
    setRes(data);
    if (pokemons.length !== 0) {
      setPokemons([...pokemons, ...data.results]);
      return;
    }
    setPokemons(data.results);
  };

  useEffect(() => {
    fetchPokemons("https://pokeapi.co/api/v2/pokemon/?limit=10");
  }, []);

  return (
    <>
      <Head>
        <title>Pokenext</title>
      </Head>
      <main className="flex flex-col items-center w-full h-screen bg-gray-50 scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full scrollbar-thin">
        <div className="mt-[80px] py-2 px-4 ">
          <h1 className="text-2xl font-extrabold text-gray-700">
            All Pokemons up to date
          </h1>
          <p className="mt-2 text-base text-gray-400">
            Pokenext is a Pokedex-like web application built around PokeApi
            using NextJs and TailwindCSS
          </p>
        </div>
        {pokemons.length !== 0 && (
          <section className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 min-h-[calc(100vh-73px)] p-4 ">
            {pokemons.map((pokemon: any, idx: number) => {
              return <Card key={idx} name={pokemon.name} />;
            })}
            <InView
              as="div"
              className="col-span-2 p-2 lg:col-span-5 md:col-span-4 sm:col-span-3"
              onChange={(inView) => {
                if (inView) {
                  fetchPokemons(res.next);
                }
              }}
            >
              <img
                className="w-24 h-24 mx-auto animate-spin"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1024px-Pok%C3%A9_Ball_icon.svg.png"
                alt="loader"
              />
            </InView>
          </section>
        )}
      </main>
    </>
  );
}
