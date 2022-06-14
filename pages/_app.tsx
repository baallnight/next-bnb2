
import App, { AppContext, AppProps } from 'next/app'
import axios from "../lib/api";
import Header from '../components/Header';
import GlobalStyle from '../styles/GlobalStyle';
import { wrapper } from "../store";
import { cookieStringToObject } from '../lib/utils';
import { userActions } from "../store/user";
import { meAPI } from '../lib/api/auth';



const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>    
      <GlobalStyle/>
      <Header/>
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
};

app.getInitialProps = async (context: AppContext) => {
  console.log(context);

  const appInitialProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  //console.log(cookieObject);
  const { store } = context.ctx!;
  //console.log('store', context.ctx);
  //if(store) {
    const { isLogged } = store.getState().user;
    try {
      if (!isLogged && cookieObject.access_token) {
        axios.defaults.headers.common.cookie = cookieObject.access_token;
        const { data } = await meAPI();
        store.dispatch(userActions.setLoggedUser(data));
      }
    } catch (e) {
      console.log(e);
    }
  //}
  

  return { ...appInitialProps };
}

//export default MyApp;
export default wrapper.withRedux(app);