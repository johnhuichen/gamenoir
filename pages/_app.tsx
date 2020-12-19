import { useEffect } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

import ErrorBoundary from "components/others/ErrorBoundary";
import Header from "components/shared/Header";
import Footer from "components/shared/Footer";
import { GTMPageView } from "lib/gtm";

import "styles/global.css";

const isProduction = process.env.NODE_ENV === "production";

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    if (isProduction) {
      router.events.on("routeChangeComplete", GTMPageView);
    }
    return () => {
      if (isProduction) {
        router.events.off("routeChangeComplete", GTMPageView);
      }
    };
  }, [router.events]);

  return (
    <ErrorBoundary>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ErrorBoundary>
  );
};

export default App;
