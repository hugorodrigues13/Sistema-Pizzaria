import { useState, ChangeEvent, FormEvent } from 'react'
import Head from 'next/head'
import styles from './styles.module.scss'
import { Container } from './styles'
import { canSSRAuth } from '@/utils/canSSRAuth'
import { Header } from '@/components/Header'
import { toast } from 'react-toastify'

import CurrencyInput from '@/components/CurrencyInput'

import { FiUpload } from 'react-icons/fi'
import { setupAPIClient } from '@/services/api'

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps {
    categoryList: ItemProps[];
}

export default function Product( {categoryList}: CategoryProps ){

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    const [avatarUrl, setAvatarUrl] = useState('')
    const [imageAvatar, setImageAvatar] = useState<File | null>(null);

    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)

    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files){
            return;
        }
    
        const image = e.target.files[0];
    
        if(!image){
            return;
        }
    
        // Corrigir a verificação dos tipos de imagem
        if(image.type === 'image/png' || image.type === 'image/jpeg'){
    
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]));
        } else {
            toast.error("Tipo de arquivo inválido. Selecione uma imagem PNG ou JPEG.");
        }
    }

    function handleChangeCategory(event: any){
        
        setCategorySelected(event.target.value)
    }

    async function handleRegister(e: FormEvent){
        e.preventDefault();
    
        try{
            const data = new FormData();
    
            if(name === '' || price === '' || description === '' || imageAvatar === null){
                toast.warning("Preencha todos os campos");
                return;
            }
            
            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[categorySelected].id);
            data.append('file', imageAvatar);
    
            const apiClient = setupAPIClient();
    
            await apiClient.post('/product', data);
    
            toast.success('Cadastrado com sucesso!');
    
            // Limpar os campos após o cadastro
            setAvatarUrl('');
            setName('');
            setPrice('');
            setDescription('');
            setImageAvatar(null);
            setCategorySelected(0);
            (document.querySelector('input[type="file"]') as HTMLInputElement).value = '';
        }catch(err){
            console.log(err);
            toast.error("Ops, erro ao cadastrar!");
        }
    }
    

    return (
        <>
            <Head>
                <title>Novo produto - Sujeito Pizzaria</title>
            </Head>
                <Header/>
            
                <Container>
                    <h1>Novo produto</h1>

                    <form onSubmit={handleRegister}>
                        <label>
                            <span>
                                <FiUpload size={25} color="FFF" />
                            </span>

                            <input type="file" accept='image/png, image/jpeg' onChange={handleFile}/>

                            {avatarUrl && (
                                 <img
                                    className="preview"
                                    src={avatarUrl} 
                                    alt="Foto do produto"
                                    width={220}
                                    height={220}
                                />
                            )}
                        </label>

                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {categories.map((item, index) => {
                                return(
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>

                        <input
                            className="input"
                            type="text"
                            placeholder='Digite o nome do produto'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <CurrencyInput
                            className="input"
                            type="text"
                            placeholder='Preço do produto'
                            value={price}
                            onChange={setPrice}
                        />

                        <textarea
                            className="input"
                            placeholder='Descreva seu produto...'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <button className="buttonAdd" type="submit">
                            Cadastrar
                        </button>
                    </form>
                </Container>
        </>
    )
}

export const getServerSideProps = canSSRAuth( async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/category')
    // console.log(response.data)

    // Ordenar a lista de categorias em ordem crescente
    const sortedCategoryList = response.data.sort((a: ItemProps, b: ItemProps) => {
        return a.name.localeCompare(b.name)
    })

    return {
        props: {
            categoryList: sortedCategoryList
        }
    }

})