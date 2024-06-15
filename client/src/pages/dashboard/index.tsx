import { useCallback, useMemo, useState } from "react"
import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from "next/head"

import { Container, HeaderContent, Body, ListOrders, Card } from "./styles"

import { Header } from "@/components/Header"
import { BoxCard } from "@/components/BoxCard"
import { FiRefreshCcw } from "react-icons/fi"

import { setupAPIClient } from "@/services/api"

import Modal from 'react-modal'
import { ModalOrder } from "@/components/ModalOrder"
import { FilterHeader } from "@/components/FilterHeader"
import { SelectInput } from "@/components/SelectInput"
import { listOfMonths } from "@/utils/month"

import { toast } from 'react-toastify';

type ListOrders = {
    id: string;
    name: string | null;
    table: number;
    status: boolean;
    draft: boolean;
    price: string | null;
    created_at: string;
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
        price: string | null;
    }
}

export default function Dashboard({orders}: HomeProps){
    const [orderList, setOrderList] = useState(orders || [])
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1)
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear())
    const [modalItem, setModalItem] = useState<OrderItemProps[]>()
    const [modalVisible, setModalVisible] = useState(false)

    const filteredOrders = useMemo(() => {
        return orderList.filter(order => {
            const orderDate = new Date(order.created_at);
            const orderMonth = orderDate.getMonth() + 1;
            const orderYear = orderDate.getFullYear();
            return orderMonth === monthSelected && orderYear === yearSelected && !order.draft && !order.status;
        });
    }, [orderList, monthSelected, yearSelected]);

    const months = useMemo(() => {
        return listOfMonths.map(item => {
          return {
            value: item.value,
            label: item.label,
          }
        });
      }, []);
    
    const years = useMemo(() => {
    let uniqueYears: number[] = [];

    if (orders) {
        [orders].forEach(list => {
            list.forEach(item => {
            const date = new Date(item.created_at);
            const year = date.getFullYear();
    
            if (!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }
            });
        });
        }
    
        return uniqueYears.map(year => {
        return {
            value: year,
            label: year,
        };
        });
    }, [orders]);

    // Filtrar os pedidos concluidos
    const completedOrders = useMemo(() => {
        return orderList.filter(item => {
            const orderDate = new Date(item.created_at);
            const orderMonth = orderDate.getMonth() + 1;
            const orderYear = orderDate.getFullYear();
            return orderMonth === monthSelected && orderYear === yearSelected && item.status && !item.draft;
        });
    }, [orderList, monthSelected, yearSelected]);

    // Filtrar os pedidos em andamento
    const inProgressOrders = useMemo(() => {
        return orderList.filter(item => {
            const orderDate = new Date(item.created_at);
            const orderMonth = orderDate.getMonth() + 1;
            const orderYear = orderDate.getFullYear();
            return orderMonth === monthSelected && orderYear === yearSelected && !item.status && !item.draft;
        });
    }, [orderList, monthSelected, yearSelected]);

    // Filtrar os pedidos cancelados
    const canceledOrders = useMemo(() => {
        return orderList.filter(item => {
            const orderDate = new Date(item.created_at);
            const orderMonth = orderDate.getMonth() + 1;
            const orderYear = orderDate.getFullYear();
            return orderMonth === monthSelected && orderYear === yearSelected && item.status && item.draft;
        });
    }, [orderList, monthSelected, yearSelected]);

    const handleMonthSelected = useCallback((month: string) => {
        try {
          const parseMonth = Number(month);
          setMonthSelected(parseMonth);
        } catch (err) {
          console.log('Invalid month value: ' + err);
        }
    }, []);

    const handleYearSelected = useCallback((year: string) => {
        try {
          const parseYear = Number(year);
          setYearSelected(parseYear);
        } catch (err) {
          console.log('Invalid year value: ' + err);
        }
    }, []);

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
       toast.success("Pedido concluído com sucesso!")
    }

    async function handleCancelOrder(id: string){
        const apiClient = setupAPIClient()

        await apiClient.put('/order/cancel', {
           order_id: id,
        })
 
        const response = await apiClient.get('/orders')
 
        setOrderList(response.data)
        setModalVisible(false)
        toast.success("Pedido cancelado!")
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
                <Container>
                    <FilterHeader title="Filtros de pesquisa:" lineColor="#D9D9D9">
                        <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected}/>
                        <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected}/>
                    </FilterHeader>
                    <Card>
                        <BoxCard 
                            color="#80FFDB" 
                            name="Concluídos"
                            icon="concluido"
                            table={completedOrders.length.toString()}
                        />
                        <BoxCard 
                            color="#80CED7" 
                            name="Em andamento"
                            icon="andamento"
                            table={inProgressOrders.length.toString()}
                        />
                        <BoxCard 
                            color="#FF3F4B" 
                            name="Cancelados"
                            icon="cancelado"
                            table={canceledOrders.length.toString()}
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
                                    filteredOrders.map(item => {
                                        const createdDate = new Date(item.created_at);
                                        const formattedTime = `${createdDate.getHours()}:${String(createdDate.getMinutes()).padStart(2, '0')}`;
                        
                                        return (
                                            <section key={item.id} className="orderItem">
                                                <button onClick={() => handleOpenModal(item.id)}>
                                                    <div className="tag"></div>
                                                    <span>Pedido Nº: {item.table}</span>
                                                </button>
                                                <span>{formattedTime}</span>
                                            </section>
                                        );
                                    })
                                )}
                        </ListOrders>
                    </Body> 
                </Container>

                { modalVisible && (
                    <ModalOrder 
                        isOpen={modalVisible}
                        onRequestClose={handleCloseModal}
                        order={modalItem}
                        handleFinishOrder={handleFinishItem}
                        handleCancelOrder={handleCancelOrder}
                    />
                )}

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
