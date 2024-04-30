import React, { useState, useEffect, FormEvent } from 'react';
import Modal from 'react-modal';
import { Container, HeaderModal, FormBody, ImgLabel } from './styles';
import { FiX, FiUpload } from "react-icons/fi"; // Adicionando o ícone FiUpload
import formatCurrency from '@/utils/formatCurrency';
import CurrencyFormat from 'react-currency-format';
import { setupAPIClient } from '@/services/api';
import { toast } from 'react-toastify';
import { canSSRAuth } from '@/utils/canSSRAuth';



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

interface EditModalProps {
    show: boolean;
    handleClose: () => void;
    product: ProductData | null;
    categories: { id: string; name: string }[];
}

export const EditModal: React.FC<EditModalProps> = ({ show, handleClose, product, categories }) => {
    if (!product) {
        return null;
    }

    const { id: productId, name: initialName, description: initialDescription, price: initialPrice, category, banner } = product;

    const [avatarUrl, setAvatarUrl] = useState<string>(`http://localhost:3333/files/${banner}`);
    const [imageAvatar, setImageAvatar] = useState<File | null>(null);
    const [name, setName] = useState<string>(initialName);
    const [description, setDescription] = useState<string>(initialDescription);
    const [price, setPrice] = useState<string>(initialPrice);
    const [categorySelected, setCategorySelected] = useState<number>(0);

    useEffect(() => {
        if (product) {
            const { name: initialName, description: initialDescription, price: initialPrice, category, banner } = product;
            setName(initialName);
            setDescription(initialDescription);
            setPrice(initialPrice);
            setCategorySelected(categories.findIndex(cat => cat.id === category.id));
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

    const handleValueChange = (values: any) => {
        const { value } = values;
        if (value === '' && values.floatValue === 0 && values.formattedValue === '') {
            return { value: '', formattedValue: '' };
        } else {
            setPrice(values.value);
        }
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
            data.append('category_id', categories[categorySelected].id);

            // Se uma nova imagem foi selecionada, enviamos ela. Caso contrário, enviamos a imagem atual do produto.
            if (imageAvatar !== null) {
                data.append('file', imageAvatar);
            } else {
                // Obter a imagem atual do produto do backend e enviá-la
                const currentImageResponse = await fetch(`http://localhost:3333/files/${banner}`);
                const currentImageBlob = await currentImageResponse.blob();
                data.append('file', currentImageBlob);
            }

            const apiClient = setupAPIClient();

            await apiClient.put(`/product/update/`, data);

            toast.success('Produto atualizado com sucesso!');

            handleClose();

        } catch (err) {
            console.error(err);
            toast.error("Ops, ocorreu um erro ao atualizar o produto!");
        }
    }

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
                            value={categorySelected}
                            onChange={(e) => setCategorySelected(parseInt(e.target.value))}
                        >
                            {categories.map((cat, index) => (
                                <option key={cat.id} value={index}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <CurrencyFormat
                            value={formatCurrency(price)}
                            onValueChange={(values) => handleValueChange(values)}
                            thousandSeparator=""
                            decimalSeparator=","
                            prefix="R$ "
                            allowNegative={false}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            allowLeadingZeros={false}
                            placeholder="Digite o valor"
                            inputMode="numeric"
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

export const getServerSideProps = canSSRAuth( async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    return {
        props: {
        }
    }

})



