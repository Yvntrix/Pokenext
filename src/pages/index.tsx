import Card from "@/components/Card";
import Header from "@/components/Header";
import Head from "next/head";
import { useState } from "react";
import { InView } from "react-intersection-observer";
import pokeball from "../../public/images/pokeball.png";
export const getServerSideProps = async () => {
  const resp = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10");
  const data = await resp.json();
  return {
    props: {
      data,
    },
  };
};

export default function Home({ data }: { data: any }) {
  const [res, setRes] = useState<any>(data.next);
  const [pokemons, setPokemons] = useState<any>(data.results);

  const fetchPokemons = async (url: string) => {
    console.log("triggered");
    const resp = await fetch(url);
    const data = await resp.json();
    setRes(data.next);
    if (pokemons.length !== 0) {
      setPokemons([...pokemons, ...data.results]);
      return;
    }
    setPokemons(data.results);
  };

  return (
    <>
      <Head>
        <title>Pokenext</title>
      </Head>
      <Header />
      <main className="flex flex-col items-center w-full h-screen bg-gray-50 scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full scrollbar-thin">
        <div className="mt-[80px] py-2 px-4 ">
          <h1 className="text-2xl font-extrabold text-gray-700">
            All Pokemons up to date
          </h1>
          <p className="mt-2 text-base text-gray-400">
            Pokenext is a Pokedex-like web application built around &nbsp;
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              PokeApi
            </a>
            &nbsp; using &nbsp;
            <a
              href="https://nextjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              NextJs
            </a>
            &nbsp; and &nbsp;
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              TailwindCSS
            </a>
            &nbsp;
          </p>
        </div>
        {pokemons.length !== 0 && (
          <section className="grid grid-cols-2 gap-3 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 ">
            {pokemons.map((pokemon: any, idx: number) => {
              return <Card key={idx} name={pokemon.name} />;
            })}
            <InView
              as="div"
              className="col-span-2 p-2 lg:col-span-5 md:col-span-4 sm:col-span-3"
              onChange={(inView) => {
                if (inView) {
                  fetchPokemons(res);
                }
              }}
            >
              <img
                className="w-24 h-24 mx-auto animate-spin"
                src={pokeball.src}
                alt="loader"
              />
            </InView>
          </section>
        )}
      </main>
    </>
  );
}
