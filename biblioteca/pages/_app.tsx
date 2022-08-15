import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'
import 'toastr/build/toastr.css'
import { RouteGuard } from '../components/routeGuard';
import Head from 'next/head'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </>

  )
}

export default MyApp
