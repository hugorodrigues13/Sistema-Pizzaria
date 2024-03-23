import Modal from 'react-modal'
import styles from './style.module.scss'

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
            <div className={styles.containerHeader}>
                <button
                    type='button'
                    onClick={onRequestClose}
                    className={styles.buttonClose}
                    style={{background: 'transparent', border: 0}}
                >
                    <FiX size={45} color='#f34748' />
                </button>
                <div className={styles.table}>
                    <strong>Pedido Nº: {tableNumber}</strong>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.containerBody}>
                    <span>Detalhes do pedido</span>
                </div>
                <div className={styles.scroll}>
                    {groupedItems && Object.values(groupedItems).map(item => (
                            <section key={item.id} className={styles.containerItem}>
                                <div><strong>{item.amount} - {item.product.name}</strong></div>
                            </section>
                        ))}
                 </div>
                 <div className={styles.observacao}>
                    <span>Observação...</span>
                 </div>
                <div className={styles.divButton}>
                    <button className={styles.buttonOrder} onClick={ () => handleFinishOrder(orderId)}>
                        Concluir
                    </button>
                    <button className={styles.buttonCancel} onClick={ () => handleFinishOrder(orderId)}>
                        Cancelar pedido
                    </button>
                </div>
            </div>

        </Modal>
    )
}