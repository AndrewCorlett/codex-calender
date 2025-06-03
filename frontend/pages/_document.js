import { Html, Head, Main, NextScript } from 'next/document'
export default function Document(){
 return (
  <Html>
   <Head>
    <link rel="manifest" href="/manifest.json" />
   </Head>
   <body>
    <Main />
    <NextScript />
    <script>
      if('serviceWorker' in navigator){navigator.serviceWorker.register('/service-worker.js')}
    </script>
   </body>
  </Html>
 )
}
