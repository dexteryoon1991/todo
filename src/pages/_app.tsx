import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { Layout } from "@/components"
import { AppProvider } from "@/context"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </SessionProvider>
  )
}
