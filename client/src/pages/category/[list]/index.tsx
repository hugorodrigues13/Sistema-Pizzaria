import React, { useState } from 'react';
import { Container } from './styles';
import Head from 'next/head';
import { canSSRAuth } from '@/utils/canSSRAuth';

import { ListContainer } from '@/components/ListContainer/Category';
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

const ListCategory = ({ categories, products }: ListCategoryProps) => {
    const [sortedItems, setSortedItems] = useState([...(categories || [])]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const getCategoryProductStatus = (categoryId: string) => {
        return products.some(product => product.category_id === categoryId) ? "SIM" : "NAO";
    };

    const getSortedItems = async () => {
        try {
            const apiClient = setupAPIClient();
            const response = await apiClient.get('/category');
            const sortedItems = response.data;
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
            toast.error("Não é possível excluir categorias com produtos vinculados.");
        } else {
            try {
                const apiClient = setupAPIClient();
                await apiClient.delete(`/category/remove?category_id=${id}`);
                toast.success("Categoria excluída com sucesso!");
                await fetchOrders();
            } catch (error) {
                toast.error("Ocorreu um erro ao excluir a categoria.");
            }
        }
    };

    const handleEditClick = (category: Category) => {
        console.log("Editando produto:", category);

        return new Promise((resolve, reject) => {
            // Simula uma requisição assíncrona para carregar os dados do produto
            setTimeout(() => {
                // Aqui você faria a lógica para carregar os dados do produto de forma assíncrona
                // Se a lógica de carregamento dos dados for bem-sucedida, resolva a Promise com o produto
                resolve(category);
                
                // Se ocorrer algum erro durante o carregamento dos dados, rejeite a Promise
                // reject(new Error("Erro ao carregar os dados do produto"));
            }, 1000); // Simula um tempo de espera de 1 segundo (você pode ajustar conforme necessário)

            setEditingCategory(category); // Atualiza o estado editingProduct com os dados do produto clicado
            setShowEditModal(true);
      });
    };

    // Função para atualizar a lista de produtos
    const updateCategoryList = async () => {
        const updatedCategories = await getSortedItems();
        setSortedItems(updatedCategories);
    };

    return (
        <>
            <Head>
                <title>Lista de categorias</title>
            </Head>
            <Container>
                <ListContainer
                    handleEditClick={handleEditClick}
                    getCategoryProductStatus={getCategoryProductStatus}
                    handleDeleteCategory={handleDeleteCategory}
                    data={sortedItems}
                    showEditModal={showEditModal}
                    setShowEditModal={setShowEditModal}
                    editingCategory={editingCategory}
                    updateCategoryList={updateCategoryList}
                    children="PRODUTOS"
                />
            </Container>
        </>
    )
}

export default ListCategory;

export const getServerSideProps = canSSRAuth(async (ctx) => {
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
