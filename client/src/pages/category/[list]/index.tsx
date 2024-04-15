import React from 'react';
import { Container } from './styles';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { canSSRAuth } from '@/utils/canSSRAuth';

import { ListContainer } from '@/components/ListContainer';

const ListCategory = ({}) => {


    return (
        <>
            <Head>
                <title>
                    Lista de categorias
                </title>
            </Head>
             <Header/>
                <Container>
                    <ListContainer/>
                    
                </Container>
        </>
    )
}

export default ListCategory;

export const getServerSideProps = canSSRAuth( async (ctx) => {

    return {
        props: {}
    }

})