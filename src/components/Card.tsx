import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import typeColor from "../../data/typeColor.json";

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

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatNumber = (num: number, size: number) => {
    let formatted = num.toString();
    while (formatted.length < size) {
      formatted = "0" + formatted;
    }
    return formatted;
  };

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
                className={`${typeColor[name]} rounded-full px-2 py-1 text-gray-50 text-xs font-semibold`}
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
