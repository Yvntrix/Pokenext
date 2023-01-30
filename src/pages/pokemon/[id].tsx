import Head from "next/head";

export const getServerSideProps = async ({ params }: any) => {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);

  if (!resp.ok) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pokemon: await resp.json(),
    },
  };
};

const Pokemon = ({ pokemon }: any) => {
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <Head>
        <title>{capitalize(pokemon.name)} | Pokénext</title>
      </Head>
      <main className="w-screen h-screen bg-slate-200">
        <h1>{capitalize(pokemon.name)}</h1>
      </main>
    </>
  );
};

export default Pokemon;
