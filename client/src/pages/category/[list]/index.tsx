import React from 'react';
import { Container } from './styles';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { canSSRAuth } from '@/utils/canSSRAuth';

import { ListContainer } from '@/components/ListContainer';
import { setupAPIClient } from '@/services/api';

interface Category {
    id: string;
    name: string;
}

interface Product {
    id: string;
    name: string;
    category_id: string;
}

interface ListCategoryProps {
    categories: Category[];
    products: Product[];
}


const ListCategory = ({categories, products}: ListCategoryProps) => {
    const getCategoryProductStatus = (categoryId: string) => {
        // Verifica se algum produto possui o category_id correspondente à categoria
        return products.some(product => product.category_id === categoryId) ? "SIM" : "NAO";
    };

    return (
        <>
            <Head>
                <title>
                    Lista de categorias
                </title>
            </Head>
             <Header/>
                <Container>
                    <ListContainer
                        getCategoryProductStatus={getCategoryProductStatus}
                        data={categories}
                    />
                    
                </Container>
        </>
    )
}

export default ListCategory;

export const getServerSideProps = canSSRAuth( async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const responseCategory = await apiClient.get('/category')
    const responseProduct = await apiClient.get('/category/product')

    return {
        props: {
            categories: responseCategory.data,
            products: responseProduct.data
        }
    }

})