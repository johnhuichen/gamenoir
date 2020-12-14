import { AppProps } from "next/app";

import ErrorBoundary from "components/others/ErrorBoundary";
import Header from "components/shared/Header";
import Footer from "components/shared/Footer";

import "styles/global.css";

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ErrorBoundary>
  );
};

export default App;
