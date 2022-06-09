import type { NextPage } from 'next';
import Head from 'next/head';
import { Comps_layout_App } from '#src/Comps/layout/App';

const Exchange: NextPage = () => {
  return (
    <div className="bg-stone-800">
      <Head>
        <title>Token Exchange</title>
        <meta name="description" content="Your New Token Exchange" />
        <link
          rel="icon"
          href="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.uPBrGqSV8_52CWr-Oz2_JgHaHa%26pid%3DApi&f=1"
        />
      </Head>
      <main>
        <Comps_layout_App />
      </main>
    </div>
  );
};

export default Exchange;
