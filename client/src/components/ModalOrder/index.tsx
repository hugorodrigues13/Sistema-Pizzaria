import Modal from 'react-modal'
import { Container, HeaderContent, Content, ListContent, ButtonFooter } from './styles'
import {FiX} from 'react-icons/fi'
import {OrderItemProps} from '@/pages/dashboard'
import { useState } from 'react';

interface ModalOrderProps{
    isOpen: boolean;
    onRequestClose: () => void;
    order?: OrderItemProps[] ;
    handleFinishOrder: (id: string) => void;
    handleCancelOrder: (id: string) => void;
}

export function ModalOrder({ isOpen, onRequestClose, order, handleFinishOrder, handleCancelOrder }: ModalOrderProps) {
    const [orderId, setOrderId] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const tableNumber = order ? (order[0]?.order?.table ?? 'N/A') : 'N/A';
    const orderItem = order ? (order[0]?.order_id ?? 'N/A') : 'N/A';

    const handleCancel = () => {
        // Define o orderItem para usar dentro da função confirmCancelOrder
        setOrderId(orderItem);
        setShowConfirmation(true);
    }


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                content: {
                    top: '50%',
                    bottom: 'auto',
                    left: '50%',
                    right: 'auto',
                    padding: '30px',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#003249',
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }
            }}
        >
            <Container>
                <HeaderContent>
                    <button
                        type='button'
                        onClick={onRequestClose}
                        className="buttonClose"
                        style={{ background: 'transparent', border: 0 }}
                    >
                        <FiX size={45} color='#f34748' />
                    </button>
                    <div className="numberOrder">
                        <strong>Pedido Nº: {tableNumber}</strong>
                    </div>
                </HeaderContent>

                <Content>
                    {showConfirmation ? (
                        <div>
                            <p>Tem certeza que deseja cancelar este pedido?</p>
                            <ButtonFooter>
                                <button className="buttonOrder" onClick={() => handleCancelOrder(orderId)}>
                                    Confirmar
                                </button>
                                <button className="buttonCancel" onClick={() => setShowConfirmation(false)}>
                                    Cancelar
                                </button>
                            </ButtonFooter>
                        </div>
                    ) : (
                        <>
                            <p>Detalhes do pedido</p>
                            <ListContent>
                                {order && order.map(item => (
                                    <section key={item.id} className="containerItem">
                                        <span><strong>{item.amount}</strong> - {item.product.name}</span>
                                    </section>
                                ))}
                            </ListContent>

                            {/* {console.log(order)} */}
                            {order && order[0] && (order[0].order.name !== null && order[0].order.name !== "") ? (
                                <div className='scroll-container'>
                                    <span>{order[0].order.name}</span>
                                </div>
                            ) : (
                                <span>Sem observação..</span>
                            )}

                            <ButtonFooter>
                                <button className="buttonOrder" onClick={() => handleFinishOrder(orderItem)}>
                                    Concluir
                                </button>
                                <button className="buttonCancel" onClick={handleCancel}>
                                    Cancelar pedido
                                </button>
                            </ButtonFooter>
                        </>
                    )}
                </Content>
            </Container>
        </Modal>
    )
}