import Modal from 'react-modal'
import styles from './style.module.scss'

import {FiX} from 'react-icons/fi'

import {OrderItemProps} from '@/pages/dashboard'

interface ModalOrderProps{
    isOpen: boolean;
    onRequestClose: () => void;
    order?: OrderItemProps[];
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
            backgroundColor: '#1d1d2e',
        }
    }

    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >

            <button
                type='button'
                onClick={onRequestClose}
                className={styles.buttonClose}
                style={{background: 'transparent', border: 0}}
            >
                <FiX size={45} color='#f34748' />
            </button>

            <div className={styles.container}>
                <div className={styles.containerHeader}>
                    <h2>Detalhes do pedido</h2>
                    <span className={styles.table}>
                        Mesa: <strong>{tableNumber}</strong>
                    </span>
                </div>

                { order?.map( item => (
                        <section key={item.id } className={styles.containerItem}>
                            <span>{item.amount} - <strong> {item.product.name}</strong></span>
                            <span className={styles.description}>{item.product.description}</span>
                        </section>
                    ))
                }

                <button className={styles.buttonOrder} onClick={ () => handleFinishOrder(orderId)}>
                    Concluir pedido
                </button>
            </div>

        </Modal>
    )
}