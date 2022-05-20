import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Provider } from 'react-redux'
import App from '../../comps/App/App'
import configureStore from '../store/configureStore'
import * as serviceWorker from '../serviceWorker'

const Home: NextPage = () => {
    return (
        <div className="bg-stone-800">
            <Head>
                <title>Token Exchange</title>
                <meta name="description" content="Token Exchange" />
                <link
                    rel="icon"
                    href="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.uPBrGqSV8_52CWr-Oz2_JgHaHa%26pid%3DApi&f=1"
                />
            </Head>


            <main>
                <Provider store={configureStore()}>
                    <App />
                </Provider>
            </main>

        </div>
    )
}

export default Home
