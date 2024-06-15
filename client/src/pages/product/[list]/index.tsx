import React, { useState } from 'react';
import { Container } from './styles';
import Head from 'next/head';
import { canSSRAuth } from '@/utils/canSSRAuth';

import { ListContainer } from '@/components/ListContainer/Product';
import { setupAPIClient } from '@/services/api';
import { toast } from 'react-toastify';
import Modal from 'react-modal'

interface Product {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
    category: {
        id: string;
        name: string;
    };
}

interface Category {
    id: string;
    name: string;
}

interface ListProductProps {
    categories: Category[];
    products: Product[];
}

const ListProducts = ({ products, categories }: ListProductProps) => {
    const [sortedItems, setSortedItems] = useState([...(products || [])]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");


    const handleEditClick = async (product: Product) => {
        console.log("Editando produto:", product);

        return new Promise((resolve, reject) => {
            // Simula uma requisição assíncrona para carregar os dados do produto
            setTimeout(() => {
                // Aqui você faria a lógica para carregar os dados do produto de forma assíncrona
                // Se a lógica de carregamento dos dados for bem-sucedida, resolva a Promise com o produto
                resolve(product);
                
                // Se ocorrer algum erro durante o carregamento dos dados, rejeite a Promise
                // reject(new Error("Erro ao carregar os dados do produto"));
            }, 1000); // Simula um tempo de espera de 1 segundo (você pode ajustar conforme necessário)

            setEditingProduct(product); // Atualiza o estado editingProduct com os dados do produto clicado
            setShowEditModal(true);
      });
    };

    // Função para atualizar a lista de produtos
    const setProducts = (updatedProducts: Product[]) => {
        setSortedItems(updatedProducts);
    };

    const getCategoryNameForItem = (id: string) => {
        const product = products.find(product => product.id === id);
        return product ? product.category.name : "";
    };

    const handleDeleteItem = async (id: string) => {
        try {
            // Faça a solicitação de exclusão do item para o servidor
            const apiClient = setupAPIClient();
            await apiClient.delete(`/product/remove?product_id=${id}`);
    
            // Se a exclusão for bem-sucedida, atualize a lista de categorias
            toast.success("Item excluído com sucesso!");
    
            // Atualize a lista de produtos após a exclusão
            const updatedProducts = sortedItems.filter(product => product.id !== id); // Usar sortedItems em vez de products
    
            console.log("Produtos atualizados após exclusão:", updatedProducts);
    
            // Atualize o estado sortedItems com a nova lista filtrada
            const filteredItems = searchTerm ? updatedProducts.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())) : updatedProducts;
    
            console.log("Itens filtrados após exclusão:", filteredItems);
    
            setSortedItems(filteredItems);
    
        } catch (error) {
            // Se ocorrer um erro durante a exclusão, exiba uma mensagem de erro
            toast.error("Ocorreu um erro ao excluir o item.");
        }
    };
    
    
    
    Modal.setAppElement('#__next')

    return (
        <>
            <Head>
                <title>
                    Lista de categorias
                </title>
            </Head>
            <Container>
            <ListContainer
                handleDeleteItem={handleDeleteItem}
                getDataStatus={getCategoryNameForItem}
                handleEditClick={handleEditClick}
                data={sortedItems}
                statusLabel="CATEGORIA"
                setProducts={setProducts}
                categories={categories}
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                editingProduct={editingProduct}
            />
            </Container>
        </>
    )
}

export default ListProducts;

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const responseProduct = await apiClient.get('/product')
    const responseCategory = await apiClient.get('/category')

    return {
        props: {
            categories: responseCategory.data,
            products: responseProduct.data
        }
    }
})
