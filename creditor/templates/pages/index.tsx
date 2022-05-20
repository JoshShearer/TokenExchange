import Head from 'next/head';

export const CREDITOR_UNDERSCORE_NAME = () => {
  return (
    <div>
      <Head>
        <title>
          {'CREDITOR_UNDERSCORE_NAME'.split('_').slice(1).join('/')}
        </title>
        <meta name="description" content="CREDITOR_UNDERSCORE_NAME Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>CREDITOR_UNDERSCORE_NAME</h1>
      </main>
    </div>
  );
};

export default CREDITOR_UNDERSCORE_NAME;

export const navigation = {
  name: 'Page',
  comp: 'CREDITOR_UNDERSCORE_NAME',
  layout: 'Comps_layout_main',
};
