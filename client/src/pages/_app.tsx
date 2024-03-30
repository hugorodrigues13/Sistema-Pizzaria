import { AuthProvider } from '@/contexts/AuthContext'
import { GlobalStyle } from '../../styles/GlobalStyles';
import { ThemeProvider } from "styled-components";
import { AppProps } from "next/app"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import dark from '../../styles/theme/dark';



function MyApp({ Component, pageProps}: AppProps){
    return (
        <AuthProvider>
            <ThemeProvider theme={dark}>
                <GlobalStyle />
                <Component {...pageProps}/>
                <ToastContainer autoClose={2000} />
            </ThemeProvider>
        </AuthProvider>
    )
    
}

export default MyApp