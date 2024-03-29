import Modal from 'react-modal'
import styles from './style.module.scss'
import { Container, HeaderContent, Content, ListContent, ButtonFooter } from './styles'

import {FiX} from 'react-icons/fi'

import {OrderItemProps} from '@/pages/dashboard'
import { TextArea } from '../ui/Input'

interface ModalOrderProps{
    isOpen: boolean;
    onRequestClose: () => void;
    order?: OrderItemProps[] ;
    handleFinishOrder: (id: string) => void;
}

export function ModalOrder({ isOpen, onRequestClose, order, handleFinishOrder}: ModalOrderProps){

     // Tratando a possibilidade de order ser undefined
  const tableNumber = order ? (order[0]?.order?.table ?? 'N/A') : 'N/A';
  const orderId = order ? (order[0]?.order_id ?? 'N/A') : 'N/A';

    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#CCDBDC',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)' // Aqui você pode definir a cor de fundo desejada, 0.5 é a opacidade
          }
    }

      // Agrupar itens por nome e calcular a quantidade total de cada item
      const groupedItems = order?.reduce((acc: {[key: string]: OrderItemProps}, currentItem: OrderItemProps) => {
        if (!acc[currentItem.product.name]) {
            acc[currentItem.product.name] = { ...currentItem };
        } else {
            acc[currentItem.product.name].amount += currentItem.amount;
        }
        return acc;
        
    }, {});

    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >

            <Container>
                <HeaderContent>
                    <button
                        type='button'
                        onClick={onRequestClose}
                        className="buttonClose"
                        style={{background: 'transparent', border: 0}}
                    >
                        <FiX size={45} color='#f34748' />
                    </button>
                    <div className="numberOrder">
                        <strong>Pedido Nº: {tableNumber}</strong>
                    </div>
                </HeaderContent>

                <Content>
                    <p>Detalhes do pedido</p>
                    <ListContent>
                        {groupedItems && Object.values(groupedItems).map(item => (
                            
                                <section key={item.id} className="containerItem">
                                    <div>
                                        <strong>{item.amount} - {item.product.name}</strong>
                                    </div>
                                </section>
                                
                            ))}
                            
                    </ListContent>
                    
                    {order && order[0] && order[0].order.name !== null ? (
                        <div className='scroll-container'>
                            <span>{order[0].order.name}</span>
                        </div>
                        ) : (
                            <span>Sem observação..</span>
                    )}


                    <ButtonFooter>
                        <button className="buttonOrder" onClick={ () => handleFinishOrder(orderId)}>
                            Concluir
                        </button>
                        <button className="buttonCancel" onClick={ () => handleFinishOrder(orderId)}>
                            Cancelar pedido
                        </button>
                    </ButtonFooter>
                </Content>
            </Container>

        </Modal>
    )
}