import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FiX } from "react-icons/fi";
import { Container, FormBody, HeaderModal } from '../styles';
import { setupAPIClient } from '@/services/api';
import { toast } from 'react-toastify';

type CategoryData = {
    id: string;
    name: string;
}

interface ModalEditProps {
    show: boolean;
    handleClose: () => void;
    category: CategoryData | null; // Alterando para aceitar nulo
    updateCategoryList: (updatedCategory: CategoryData[]) => void; 
}

export const EditModalCategory: React.FC<ModalEditProps> = ({ show, handleClose, category, updateCategoryList }) => {
    console.log('Category:', category);
    const [name, setName] = useState<string>(category ? category.name : '');
    console.log('Name:', name);

    // Efeito para atualizar o estado 'name' quando a propriedade 'category' mudar
    useEffect(() => {
        setName(category ? category.name : '');
    }, [category]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            if (!category) {
                return; 
            }
    
            const apiClient = setupAPIClient();

            const data = {
                id: category.id,
                name: name
            };

            const response = await apiClient.put(`/category/update/`, data);

            toast.success('Nome da categoria atualizado com sucesso!');
            updateCategoryList(response.data); 
            handleClose();
        } catch (err) {
            console.error(err);
            toast.error('Ops, ocorreu um erro ao atualizar o nome da categoria!');
        }
    };

    Modal.setAppElement('#__next')

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
                    <span className="border-bottom">EDITAR CATEGORIA</span>
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


