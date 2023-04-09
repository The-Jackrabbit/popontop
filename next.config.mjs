// @ts-check
import { env } from './src/env/server.mjs';

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async headers() {
    return [
      {
        source: '/_next/image',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable', }]
      }
    ];
  },
  images: {
    minimumCacheTTL: 60,
    domains: ['lastfm.freetls.fastly.net', 'lh3.googleusercontent.com'],
  },
});
