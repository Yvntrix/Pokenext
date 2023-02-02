import { capitalize, formatNumber, typeColor } from "@/components/Card";
import Chart from "@/components/Chart";
import Head from "next/head";
import Image from "next/image";

export const getServerSideProps = async ({ params }: any) => {
  const [pokemonDescRes, pokemonRes] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${params.id}`),
    fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`),
  ]);

  const [pokemonDesc, pokemon] = await Promise.all([
    pokemonDescRes.json(),
    pokemonRes.json(),
  ]);

  if (!pokemonDescRes.ok || !pokemonRes.ok) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pokemonDesc,
      pokemon,
    },
  };
};

const Pokemon = ({ pokemonDesc, pokemon }: any) => {
  function removeEscapeCharacters(str: string) {
    return str.replace(/[\n\f\t]/g, " ");
  }

  function getFirstEnglishFlavorText(
    array: { flavor_text: string; language: { name: string } }[]
  ): string | null {
    const englishFlavorText = array.find((obj) => obj.language.name === "en");
    return englishFlavorText ? englishFlavorText.flavor_text : null;
  }

  const baseStats = pokemon.stats.map(
    (stat: { base_stat: number }) => stat.base_stat
  );

  return (
    <>
      <Head>
        <title>{`${capitalize(pokemonDesc.name)} | Pokénext`}</title>
      </Head>
      <main className="w-full pt-[70px] h-screen  scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full scrollbar-thin overflow-hidden">
        <section className="flex flex-col items-center gap-8">
          <div className="flex items-center justify-center p-3">
            <span className="text-2xl font-semibold text-gray-900">
              {capitalize(pokemonDesc.name)}
            </span>
            <span className="text-2xl text-gray-400">
              &nbsp;#{formatNumber(pokemonDesc.id, 4)}
            </span>
          </div>
          <div className="flex flex-col items-center gap-5 md:items-start md:flex-row">
            <Image
              className="transition-all bg-gray-200/70 rounded-xl hover:scale-105 h-[250px] w-[250px] max-h-[250px] max-w-[250px]"
              priority
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDesc.id}.png`}
              alt={pokemonDesc.name}
              width={250}
              height={250}
            />
            <div className="max-h-[350px] w-[350px] gap-3 flex flex-col">
              <span className="flex flex-col items-center">
                {pokemonDesc.flavor_text_entries.length !== 0
                  ? removeEscapeCharacters(
                      getFirstEnglishFlavorText(
                        pokemonDesc.flavor_text_entries
                      ) as string
                    )
                  : "No description available"}
              </span>
              <h1 className="text-lg">Type</h1>
              <div className="flex gap-2">
                {pokemon.types.map(({ type }: any) => {
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
            </div>
          </div>
          <Chart name={pokemonDesc.name} baseStats={baseStats} />
        </section>
      </main>
    </>
  );
};

export default Pokemon;
