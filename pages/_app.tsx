import App, { AppContext, AppProps } from "next/app";
import axios from "../lib/api";
import Header from "../components/Header";
import GlobalStyle from "../styles/GlobalStyle";
import { wrapper } from "../store";
import { cookieStringToObject } from "../lib/utils";
import { meAPI } from "../lib/api/auth";
import { userActions } from "../store/user";
import { AnyListenerPredicate } from "@reduxjs/toolkit/dist/listenerMiddleware/types";
import { DefaultProps } from "react-outside-click-handler";
import { MakeStore } from "next-redux-wrapper";
import { GetServerSideProps } from 'next';
import cookies from "next-cookies";
import { setToken } from "../lib/TokenManager";

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
};
/*
export const getServerSideProps: GetServerSideProps = async (context) => {
  //const appInitialProps = await App.getInitialProps(context);
  console.log("serversideProps");
  const { data } = await meAPI();
  console.log("data:", data);
  return { props: { data: data } };
  //return { ...appInitialProps};
}

app.getInitialProps = async (context) => {
  const appInitialProps = await App.getInitialProps(context);
  //console.log(context.ctx.req?.headers.cookie);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  const { store } = context.ctx;
  const { data } = await meAPI();
  console.log(data);

  if( store ) {
    const { isLogged } = store.getState().user;
    console.log("stored");
  }
  

  axios.defaults.headers.common.cookie = cookieObject.access_token;
  console.log(cookieObject);
  return {...appInitialProps};
}
*/
/*
app.getInitialProps = async (context:AppContext) => {
  const appInitialProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  const { store } = context.ctx;

 if(store) {
    console.log(store);
    const { isLogged } = store.getState().user;
    try {
      if (!isLogged && cookieObject.access_token) {
        axios.defaults.headers.common["cookie"] = cookieObject.access_token;
        const { data } = await meAPI();
        store.dispatch(userActions.setLoggedUser(data));
      }
    } catch (e:any) {
      console.log(e.message);
    }
  }
  
  return { ...appInitialProps };
};
*/
app.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  const {ctx} = appContext;
  const allCookies = cookies(ctx);

  const accessTokenByCookie = allCookies['access_token'];
  if(accessTokenByCookie !== undefined) {
    axios.defaults.headers.common["cookie"] = cookieObject.access_token;
        const { data } = await meAPI();
        store.dispatch(userActions.setLoggedUser(data));
  }

  return {...appProps}
}
export default wrapper.withRedux(app);
