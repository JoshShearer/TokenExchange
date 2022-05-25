import Head from 'next/head';

export const pages_Exchange = () => {
  return (
    <div>
      <Head>
        <title>
          {'pages_Exchange'.split('_').slice(1).join('/')}
        </title>
        <meta name="description" content="pages_Exchange Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>pages_Exchange</h1>
      </main>
    </div>
  );
};

export default pages_Exchange;

export const navigation = {
  name: 'Page',
  comp: 'pages_Exchange',
  layout: 'Comps_layout_main',
};
