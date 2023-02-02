import { Head, Html, Main, NextScript } from "next/document";
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
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
