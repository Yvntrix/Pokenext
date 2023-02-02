import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";
import data from "../../data/data.json";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:url" content={data.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content={data.imgUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content={data.domain} />
        <meta property="twitter:url" content={data.url} />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.description} />
        <meta name="twitter:image" content={data.imgUrl} />
      </Head>
      <body>
        <header className="fixed top-0 z-10 flex items-end justify-between w-full p-4 border shadow-md bg-gray-50/80 border-b-gray-200">
          <Link href="/">
            <h1 className="text-2xl font-semibold text-gray-700">Pokénext</h1>
          </Link>

          <a
            href="https://github.com/Yvntrix"
            className="px-4 py-2 font-medium text-white bg-purple-400 rounded-md hover:bg-purple-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            About Me
          </a>
        </header>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
