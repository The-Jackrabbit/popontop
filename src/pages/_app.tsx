// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import Head from "next/head";
import "../styles/globals.css";
import ismobile from 'is-mobile';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#f8fafc"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#171717"
        />
        {ismobile() && (

          <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, initial-scale=1.0, viewport-fit=cover" />
        )}
        <title>popontop</title>
      </Head>
      <Layout Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
};
const Layout = ({ Component, pageProps }: { Component: any; pageProps: any; }) => {
  if ((Component as any).getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  } else {
    return <Component {...pageProps} />;
  }
};
export default trpc.withTRPC(MyApp);
