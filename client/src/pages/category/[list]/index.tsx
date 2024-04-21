import React, { useState } from 'react';
import { Container } from './styles';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { canSSRAuth } from '@/utils/canSSRAuth';

import { ListContainer } from '@/components/ListContainer';
import { setupAPIClient } from '@/services/api';
import { toast } from 'react-toastify';

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
    const [sortedItems, setSortedItems] = useState([...(categories || [])]);

    const getCategoryProductStatus = (categoryId: string) => {
        // Verifica se algum produto possui o category_id correspondente à categoria
        return products.some(product => product.category_id === categoryId) ? "SIM" : "NAO";
    };

    // Sua função que traz a listagem e ordena os itens
    const getSortedItems = async () => {
        try {
          const apiClient = setupAPIClient();
          const response = await apiClient.get('/category');
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

    const handleDeleteCategory = async (id: string) => {
        const status = getCategoryProductStatus(id);
        if (status === "SIM") {
          // Se houver produtos vinculados, exiba uma mensagem de erro
          toast.error("Não é possível excluir categorias com produtos vinculados.");
        } else {
          try {
            // Faça a solicitação de exclusão da categoria para o servidor
            const apiClient = setupAPIClient();
            await apiClient.delete(`/category/remove?category_id=${id}`);
      
            // Se a exclusão for bem-sucedida, atualize a lista de categorias
            toast.success("Categoria excluída com sucesso!");
      
            await fetchOrders();
            
          } catch (error) {
            // Se ocorrer um erro durante a exclusão, exiba uma mensagem de erro
            toast.error("Ocorreu um erro ao excluir a categoria.");
          }
        }
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
                        handleDeleteCategory={handleDeleteCategory}
                        getCategoryProductStatus={getCategoryProductStatus}
                        data={sortedItems}
                        children="PRODUTOS"
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