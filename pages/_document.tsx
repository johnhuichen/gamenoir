import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

import { GTM_ID } from "lib/gtm";

const isProduction = process.env.NODE_ENV === "production";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          {/* Google Tag Manager */}
          {isProduction && (
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');`,
              }}
            />
          )}
          {/* End Google Tag Manager */}
          <script
            data-ad-client="ca-pub-6832276300619596"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Crimson+Text"
            rel="stylesheet"
          />
          <link
            href="https://use.fontawesome.com/releases/v5.12.1/css/svg-with-js.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal-root" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
