import { useEffect } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

import ErrorBoundary from "components/others/ErrorBoundary";
import Header from "components/shared/Header";
import Footer from "components/shared/Footer";
import { GTMPageView } from "lib/gtm";

import "styles/global.css";

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", GTMPageView);
    return () => {
      router.events.off("routeChangeComplete", GTMPageView);
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
