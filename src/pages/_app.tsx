// src/pages/_app.tsx
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import Head from 'next/head';
import '../styles/globals.css';
import ismobile from 'is-mobile';
import {
  DARK_MODE_META_TAG,
  DARK_MODE_THEME_COLOR,
  LIGHT_MODE_META_TAG,
  LIGHT_MODE_THEME_COLOR,
} from '../utils/mobile-theme';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="./apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="./favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="./favicon-16x16.png"
        />

        <link rel="manifest" href="./site.webmanifest" />
        <meta
          name="description"
          content="Popontop lets you create and customize lists of your favorite music."
        />
        <meta
          id={LIGHT_MODE_META_TAG}
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content={LIGHT_MODE_THEME_COLOR}
        />
        <meta
          id={DARK_MODE_META_TAG}
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content={DARK_MODE_THEME_COLOR}
        />
        {ismobile() && (
          <meta
            name="viewport"
            content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, initial-scale=1.0, viewport-fit=cover"
          />
        )}
        <title>popontop</title>
      </Head>
      <div className="">
        <Component {...pageProps} />
      </div>
      <div
        id="modal-root"
        className="
          fixed top-0 left-0 bottom-0
          h-0 w-[100%]
         "
      />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
