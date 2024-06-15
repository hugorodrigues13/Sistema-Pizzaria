import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { AuthProvider } from '@/contexts/AuthContext';
import { GlobalStyle } from '../../styles/GlobalStyles';
import { ThemeProvider } from "styled-components";
import { AppProps } from "next/app";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';
import dark from '../../styles/theme/dark';
import { Header } from '@/components/Header';

NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleStop);
    Router.events.on('routeChangeError', handleStop);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleStop);
      Router.events.off('routeChangeError', handleStop);
    };
  }, []);

  const isHeaderVisible = !['/', '/signup'].includes(router.pathname);

  return (
    <AuthProvider>
      <ThemeProvider theme={dark}>
        <GlobalStyle />
        {isHeaderVisible && <Header />}
        <Component {...pageProps} />
        <ToastContainer autoClose={2000} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
