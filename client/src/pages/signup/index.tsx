import { useState, FormEvent, useContext } from 'react'
import styles from '../../../styles/home.module.scss'
import Image from 'next/image'
import Head from 'next/head'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

import logoImg from '../../../public/logo.svg'

import { AuthContext } from '@/contexts/AuthContext'

import { toast } from 'react-toastify'

export default function Signup(){
    const {signUp} = useContext(AuthContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)

    async function handleSignUp(event: FormEvent){
        event.preventDefault()

        if(name === '' || email === '' || password === ''){
            toast.warning("Preencha todos os campos")
            return
        }
        setLoading(true)

        let data = {
            name,
            email,
            password,
        }

        await signUp(data)

        setLoading(false);
    }

    return (
        <>
        <Head>
            <title>
                Faça seu cadastro
            </title>
        </Head>
        <div className={styles.containerCenter}>
            <Image src={logoImg} alt='logo sujeito pizzaria' />

            <div className={styles.login}>
            <h1>Criando sua conta</h1>
                <form onSubmit={handleSignUp}>
                    <Input 
                        type='text'
                        placeholder='Nome'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input 
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input 
                        type='password'
                        placeholder='Crie uma senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        type='submit'
                        loading={loading}
                    >
                        Cadastrar
                    </Button>
                </form>

                <Link href="/">
                    <p className={styles.text}>Já possui uma conta?</p>
                </Link>

            </div>
        </div>
        </>
    )
}