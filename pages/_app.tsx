import '../styles/globals.css'
import 'react-toastify/ReactToastify.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import Layout from '../components/layouts/default'

export type NextPageWithLayout = NextPage & {
  getLayout?: (_page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // The service worker registers exactly once, via next-pwa's own `register:
  // true` script in the document head. Registering here as well built a second
  // Workbox on every render — a duplicate registration each time the user
  // navigates, and two controllers fighting over the same /sw.js scope.
  // eslint-disable-next-line react/no-unstable-nested-components
  const PageNode = () => (
    <>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )

  return Component.getLayout ? (
    Component.getLayout(<PageNode />)
  ) : (
    <Layout>
      <div id="layout">
        <PageNode />
      </div>
    </Layout>
  )
}

export default MyApp
