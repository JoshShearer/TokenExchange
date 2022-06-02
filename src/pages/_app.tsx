import '../styles/globals.css'
import type { AppProps } from 'next/app'
import App from 'next/app'
import { Provider } from 'react-redux';
import { store } from "#src/models/store";


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      </Provider>
      )
}

// MyApp.getInitialProps = async (appContext) => {
// 	const appProps = await App.getInitialProps(appContext)
// 	return { ...appProps }
// }

