import React, { useState, useEffect, FormEvent } from 'react';
import Modal from 'react-modal';
import { Container, HeaderModal, FormBody, ImgLabel } from '../styles';
import { FiX, FiUpload } from "react-icons/fi";
import CurrencyInput from '../../CurrencyInput';
import { setupAPIClient } from '@/services/api';
import { toast } from 'react-toastify';

type ProductData = {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
    category: {
        id: string;
        name: string;
    };
}

type CategoryData = {
    id: string;
    name: string;
}

interface EditModalProps {
    show: boolean;
    handleClose: () => void;
    product: ProductData | null;
    products: ProductData[];
    categories: CategoryData[] | null;
    setProducts: (updatedProducts: ProductData[]) => void;
}

export const EditModal: React.FC<EditModalProps> = ({ show, handleClose, product, categories, setProducts, products }) => {
    if (!product) { return null }
    const { id: productId, name: initialName, description: initialDescription, price: initialPrice, category: initialCategory, banner } = product;

    const [avatarUrl, setAvatarUrl] = useState<string>(`http://localhost:3333/files/${banner}`);
    const [imageAvatar, setImageAvatar] = useState<File | null>(null);
    const [name, setName] = useState<string>(initialName);
    const [description, setDescription] = useState<string>(initialDescription);
    const [price, setPrice] = useState<string>(initialPrice);
    const [categorySelected, setCategorySelected] = useState<CategoryData | null>(initialCategory);
  
    useEffect(() => {
        if (product && categories) {
            setName(initialName);
            setDescription(initialDescription);
            setPrice(initialPrice);
            setCategorySelected(initialCategory);
            setAvatarUrl(`http://localhost:3333/files/${banner}`);
        }
    }, [product, categories]);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const image = e.target.files[0];

        if (!image || (image.type !== 'image/png' && image.type !== 'image/jpeg')) return;

        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(image));
    };

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
    
        try {
            const data = new FormData();
    
            if (name === '' || price === '' || description === '') {
                toast.warning("Preencha todos os campos");
                return;
            }
    
            data.append('product_id', productId);
            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', (categorySelected && categorySelected.id) ?? '');
    
            if (imageAvatar !== null) {
                data.append('file', imageAvatar);
            } else {
                const currentImageResponse = await fetch(`http://localhost:3333/files/${banner}`);
                const currentImageBlob = await currentImageResponse.blob();
                data.append('file', currentImageBlob);
            }
    
            console.log("Data to be sent to the server:", data);
    
            const apiClient = setupAPIClient();
    
            const response = await apiClient.put(`/product/update/`, data);
            const updatedProductData = response.data; // Use response.data to access the data from the response
    
            const updatedProductIndex = products.findIndex(p => p.id === productId);
            if (updatedProductIndex !== -1) {
                const updatedProduct = {
                    ...updatedProductData,
                    category: categorySelected || { id: '', name: '' }
                };
                const updatedProducts = [...products];
                updatedProducts[updatedProductIndex] = updatedProduct;
                setProducts(updatedProducts);
                console.log(updatedProducts)
            }
    
            toast.success('Produto atualizado com sucesso!');
    
            handleClose();
    
        } catch (err) {
            console.error(err);
            toast.error("Ops, ocorreu um erro ao atualizar o produto!");
        }
    }

    useEffect(() => {
        if (!show) {
            // Reset only edited data when the modal is closed without saving
            setName(initialName);
            setDescription(initialDescription);
            setPrice(initialPrice);
            setCategorySelected(initialCategory);
            setAvatarUrl(`http://localhost:3333/files/${banner}`);
        }
    }, [show]);

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
                    <span className="border-bottom">EDITAR PRODUTO</span>
                    <FiX size={30} color='#FF3F4B' onClick={handleClose} />
                </HeaderModal>
                <FormBody onSubmit={handleRegister}>
                    <ImgLabel>
                        <span>
                            <FiUpload size={25} color="FFF" />
                        </span>
                        <input type="file" accept='image/png, image/jpeg' onChange={handleFile} />
                        {avatarUrl && (
                            <img
                                className="preview"
                                src={avatarUrl}
                                alt="Foto do produto"
                                width={220}
                                height={220}
                            />
                        )}
                    </ImgLabel>
                    <input
                        type="text"
                        placeholder='Nome'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <div className='div-row'>
                        <select
                            value={categorySelected?.name ?? ''}
                            onChange={(e) => {
                                const selectedCategory = categories?.find(cat => cat.name === e.target.value);
                                setCategorySelected(selectedCategory ?? null);
                            }}
                        >
                            {categories ? (
                                categories.map((cat) => (
                                    <option key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))
                            ) : (
                                <option value="">Carregando...</option>
                            )}
                        </select>

                        <CurrencyInput
                            value={price}
                            onChange={setPrice}
                        />
                        
                    </div>
                    <input
                        type='text'
                        className='text-area'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Descrição'
                    />
                    <div className="div-button">
                        <button type="submit">SALVAR</button>
                    </div>
                </FormBody>
            </Container>
        </Modal>
    );
};
