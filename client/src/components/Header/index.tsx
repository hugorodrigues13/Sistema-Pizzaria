import { useContext } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import { AuthContext } from '@/contexts/AuthContext'

import { FiLogOut } from 'react-icons/fi'

export function Header(){
    const {user, signOut} = useContext(AuthContext)

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                    <img src="/logo.svg" width={190} height={60} alt="" />
                </Link>

                {/* <h1>{user?.name}</h1> */}

                <nav className={styles.menuNav}>
                    <Link href="/category">
                        <p>Categoria</p>
                    </Link>

                    <Link href='/product'>
                        <p>Cardapio</p>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color="FFF" size={24} />
                    </button>
                </nav>
            </div>
        </header>
    )
}