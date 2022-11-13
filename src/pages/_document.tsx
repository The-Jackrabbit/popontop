import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body
        onScroll={(e) => { e.preventDefault(); e.stopPropagation(); }}
        // style={{ backgroundColor: 'red'}}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}