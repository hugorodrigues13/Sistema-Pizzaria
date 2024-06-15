import { useState, FormEvent } from "react"
import Head from "next/head"
import { Container, MainContent } from "./styles"

import { toast } from "react-toastify"

import { setupAPIClient } from "@/services/api"
import { canSSRAuth } from "@/utils/canSSRAuth"

export default function Category(){
    const [name, setName] = useState('')

    async function handleRegister(event: FormEvent){
        event.preventDefault()

        if(name === ''){
            toast.info('Insira um nome para a categoria!')
            return;
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/category', {
            name: name
        })

        toast.success('Categoria cadastrada com sucesso!')
        setName('')
    }

    return(
        <>
            <Head>
                <title>
                    Nova categoria - Sujeito Pizzaria
                </title>
            </Head>
            <Container>
                <MainContent>
                    <h1>Cadastrar categoria</h1>
                    <form onSubmit={handleRegister}>
                        <input 
                            type="text" 
                            placeholder="Digite o nome da categoria"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <button type="submit">
                            Cadastrar
                        </button>
                    </form>
                </MainContent>
            </Container>
        </>
    )
}

export const getServerSideProps = canSSRAuth( async (ctx) => {

    return {
        props: {}
    }

})