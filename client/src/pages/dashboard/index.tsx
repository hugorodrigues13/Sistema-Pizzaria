import { useState } from "react"
import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from "next/head"

import { Container, HeaderContent, Body, ListOrders, Card } from "./styles"

import { Header } from "@/components/Header"
import { BoxCard } from "@/components/BoxCard"
import { FiRefreshCcw } from "react-icons/fi"

import { setupAPIClient } from "@/services/api"

import Modal from 'react-modal'
import { ModalOrder } from "@/components/ModalOrder"

type ListOrders = {
    id: string;
    name: string | null;
    table: number;
    status: boolean;
    draft: boolean;
}

interface HomeProps {
    orders: ListOrders[];
}

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string;
    }
    order: {
        id: string;
        table: string | number;
        status: boolean;
        name: string | null;
    }
}

export default function Dashboard({orders}: HomeProps){
    const [orderList, setOrderList] = useState(orders || [])

    const [modalItem, setModalItem] = useState<OrderItemProps[]>()
    const [modalVisible, setModalVisible] = useState(false)

    const filteredOrders = orderList.filter(item => !item.draft && !item.status);

    function handleCloseModal(){
        setModalVisible(false)
    }

    async function handleOpenModal(id: string){
        const apiClient = setupAPIClient()

        const response = await apiClient.get('/order/detail', {
            params: {
                order_id: id,
            }
        })

        setModalItem(response.data)
        setModalVisible(true)
    }

    async function handleFinishItem(id: string){
       const apiClient = setupAPIClient()

       await apiClient.put('/order/finish', {
          order_id: id,
       })

       const response = await apiClient.get('/orders')

       setOrderList(response.data)
       setModalVisible(false)
    }

    async function handlRefreshOrders(){
        const apiClient = setupAPIClient()

        const response = await apiClient.get('/orders')

        setOrderList(response.data)
    }

    Modal.setAppElement('#__next')

    return(
        <>
           <Head>
                <title>Painel - Sujeito Pizzaria</title>
           </Head>
           <>
                <Header/>

                <Container>
                    <Card>
                        <BoxCard 
                            color="#80FFDB" 
                            name="Concluídos"
                            icon="concluido"
                            table={orderList.filter(item => item.status && !item.draft).length.toString()}
                        />
                        <BoxCard 
                            color="#80CED7" 
                            name="Em andamento"
                            icon="andamento"
                            table={orderList.filter(item => !item.status && !item.draft).length.toString()}
                        />
                        <BoxCard 
                            color="#FF3F4B" 
                            name="Cancelados"
                            icon="cancelado"
                            table={orderList.filter(item => item.status && item.draft).length.toString()}
                        />
                    </Card>
                    <Body>
                        <HeaderContent>
                            <h1>Últimos pedidos</h1>
                            <button onClick={handlRefreshOrders}>
                                <FiRefreshCcw size={25} color="#3fffa3" />    
                            </button>  
                        </HeaderContent>

                        <ListOrders>

                        {filteredOrders.length === 0 ? (
                                <span className="emptyList">Nenhum item na listagem</span>
                            ) : (
                                filteredOrders.map(item => (
                                    <section key={item.id} className="orderItem">
                                        <button onClick={() => handleOpenModal(item.id)}>
                                            <div className="tag"></div>
                                            <span>Pedido Nº: {item.table}</span>
                                        </button>
                                    </section>
                                ))
                            )}
                        </ListOrders>
                    </Body> 
                </Container>

                { modalVisible && (
                    <ModalOrder 
                        isOpen={modalVisible}
                        onRequestClose={handleCloseModal}
                        order={modalItem}
                        handleFinishOrder={ handleFinishItem}
                    />
                )}

           </>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/orders')

    return {
        props: {
            orders: response.data
        }
    }
})
