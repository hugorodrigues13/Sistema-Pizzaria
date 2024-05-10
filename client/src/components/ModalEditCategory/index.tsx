import React, { useState } from 'react';
import Modal from 'react-modal';
import { FiX } from "react-icons/fi";
import { Container, FormBody, HeaderModal } from './styles';
import { setupAPIClient } from '@/services/api';
import { toast } from 'react-toastify';
import { canSSRAuth } from '@/utils/canSSRAuth';

type CategoryData = {
    id: string;
    name: string;
}

interface ModalEditProps {
    show: boolean;
    handleClose: () => void;
    category: CategoryData; // Corrigindo o nome da propriedade para ser singular
    updateCategoryList: (updatedCategory: CategoryData) => void; // Adicione a propriedade updateCategoryList
}

export const EditModalCategory: React.FC<ModalEditProps> = ({ show, handleClose, category, updateCategoryList }) => {
    const [name, setName] = useState<string>(category.name); // Corrigindo a inicialização do estado

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const apiClient = setupAPIClient();

            // Fazer a requisição para atualizar apenas o nome da categoria
             const response = await apiClient.put(`/category/update/${category.id}`, { name });

             toast.success('Nome da categoria atualizado com sucesso!');
             updateCategoryList(response.data); // Chame a função de atualização com a resposta da API
             handleClose();
        } catch (err) {
            console.error(err);
            toast.error('Ops, ocorreu um erro ao atualizar o nome da categoria!');
        }
    };

    return (
        <Modal
            isOpen={show}
            onRequestClose={handleClose}
            contentLabel="Edit Item Modal"
            style={{
                content: {
                    top: '50%',
                    bottom: 'auto',
                    left: '50%',
                    right: 'auto',
                    padding: '30px',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#fff',
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }
            }}
        >
            <Container>
                <HeaderModal>
                    <span className="border-bottom">EDITAR CATEGORIA</span> {/* Corrigindo o texto para categoria */}
                    <FiX size={30} color='#FF3F4B' onClick={handleClose} />
                </HeaderModal>
                <FormBody onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder='Nome'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="div-button">
                        <button type="submit">SALVAR</button>
                    </div>
                </FormBody>
            </Container>
        </Modal>
    );
};
