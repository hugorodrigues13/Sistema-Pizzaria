import React, { useState } from 'react';
import { Container } from './styles';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { canSSRAuth } from '@/utils/canSSRAuth';

import { ListContainer } from '@/components/ListContainer';
import { setupAPIClient } from '@/services/api';
import { toast } from 'react-toastify';


interface Product {
    id: string;
    name: string;
    category: {
        id: string;
        name: string;
    };
}

interface ListProductProps {
    products: Product[];
}


const ListProducts = ({ products }: ListProductProps) => {
    const [sortedItems, setSortedItems] = useState([...(products || [])]);

    const getCategoryNameForItem = (id: string) => {
        const product = products.find(product => product.id === id);
        return product ? product.category.name : "";
    };

    // Sua função que traz a listagem e ordena os itens
    const getSortedItems = async () => {
        try {
            const apiClient = setupAPIClient();
            const response = await apiClient.get('/product');
            const sortedItems = response.data; // Assumindo que a API já retorna a lista ordenada
            return sortedItems;

        } catch (error) {
            return [];
        }
    };

    const fetchOrders = async () => {
        const sortedItems = await getSortedItems();
        setSortedItems(sortedItems);
    };

    const handleDeleteItem = async (id: string) => {
        try {
            // Faça a solicitação de exclusão do item para o servidor
            const apiClient = setupAPIClient();
            await apiClient.delete(`/product/remove?product_id=${id}`);

            // Se a exclusão for bem-sucedida, atualize a lista de categorias
            toast.success("Item excluído com sucesso!");

            await fetchOrders();

        } catch (error) {
            // Se ocorrer um erro durante a exclusão, exiba uma mensagem de erro
            toast.error("Ocorreu um erro ao excluir o item.");
        }
    };

    return (
        <>
            <Head>
                <title>
                    Lista de categorias
                </title>
            </Head>
            <Header />
            <Container>
                <ListContainer
                    handleDeleteItem={handleDeleteItem}
                    getDataStatus={getCategoryNameForItem}
                    data={sortedItems}
                    statusLabel="CATEGORIA"
                />
            </Container>
        </>
    )
}

export default ListProducts;

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const responseProduct = await apiClient.get('/product')

    return {
        props: {
            products: responseProduct.data
        }
    }
})
