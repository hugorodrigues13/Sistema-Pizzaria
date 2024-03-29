import { useContext } from 'react'
import styles from './styles.module.scss'
import { Container, NavHeader } from './styles'

import Link from 'next/link'
import { AuthContext } from '@/contexts/AuthContext'

import { FiLogOut } from 'react-icons/fi'

export function Header(){
    const {user, signOut} = useContext(AuthContext)

    return (
        <Container>
                <Link href='/dashboard'>
                    <img src="/logo.svg" width={190} height={60} alt="" />
                </Link>

                {/* <h1>{user?.name}</h1> */}

                <NavHeader>
                    <Link href="/category">
                        <p className='menuNav'>Categoria</p>
                    </Link>

                    <Link href='/product'>
                        <p className='menuNav'>Cardapio</p>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color="CCDBDC" size={24} />
                    </button>
                </NavHeader>
        </Container>
    )
}