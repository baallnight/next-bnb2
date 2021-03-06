
import type { AppProps } from 'next/app'
import Header from '../components/Header';
import GlobalStyle from '../styles/GlobalStyle';
import { wrapper } from "../store";
import { createWrapper } from 'next-redux-wrapper';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>    
      <GlobalStyle/>
      <Header/>
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
}

//export default MyApp
export default wrapper.withRedux(MyApp);
