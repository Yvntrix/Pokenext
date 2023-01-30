import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export const typeColor = {
  fire: "bg-orange-500",
  grass: "bg-lime-500",
  electric: "bg-yellow-500",
  water: "bg-blue-500",
  ground: "bg-yellow-700",
  rock: "bg-yellow-600",
  fairy: "bg-pink-500",
  poison: "bg-purple-500",
  bug: "bg-lime-700",
  dragon: "bg-purple-700",
  psychic: "bg-fuchsia-500",
  flying: "bg-sky-300",
  fighting: "bg-red-700",
  normal: "bg-gray-400",
  steel: "bg-slate-300",
  ice: "bg-cyan-400",
  ghost: "bg-purple-800",
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatNumber = (num: number, size: number) => {
  let formatted = num.toString();
  while (formatted.length < size) {
    formatted = "0" + formatted;
  }
  return formatted;
};

const Card = ({ name }: { name: string }) => {
  const [pokemon, setPokemon] = useState<any>({});

  useEffect(() => {
    const getPokemon = async () => {
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await resp.json();
      // console.log(data);
      setPokemon(data);
    };
    getPokemon();
  }, [name]);

  return Object.keys(pokemon).length !== 0 ? (
    <Link
      href={`pokemon/${name}`}
      className="flex flex-col items-center gap-1 p-4 transition-all rounded-lg shadow-lg bg-gray-50 hover:scale-105"
    >
      <Image
        className={`rounded-lg p-2 bg-gray-200/70`}
        priority
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        alt={name}
        width={150}
        height={150}
      />
      <h1 className="text-xs font-semibold">{`#${formatNumber(
        pokemon.id,
        4
      )}`}</h1>
      <h1 className="font-semibold text-md">{capitalize(name)}</h1>
      <div className="flex gap-2">
        {pokemon.types &&
          pokemon.types.map(({ type }: any) => {
            const name: keyof typeof typeColor = type.name.toString();

            return (
              <span
                className={` ${typeColor[name]} rounded-full px-2 py-1 text-gray-50 text-xs font-semibold`}
                key={type.name}
              >
                {type.name.toString().toUpperCase()}
              </span>
            );
          })}
      </div>
    </Link>
  ) : null;
};

export default Card;
