import { RefObject, useContext, useEffect, useRef, useState } from 'react'
import { Container, NavHeader } from './styles'

import Link from 'next/link'
import { AuthContext } from '@/contexts/AuthContext'

import { FiChevronDown, FiChevronRight, FiLogOut } from 'react-icons/fi'

export function Header(){
    const {user, signOut} = useContext(AuthContext)
    const [arrowRotationCategoria, setArrowRotationCategoria] = useState(false);
    const [arrowRotationProduct, setArrowRotationProduct] = useState(false);
    const [activeSubMenuCategory, setActiveSubMenuCategory] = useState(null);
    const [activeSubMenuProduct, setActiveSubMenuProduct] = useState(null);

    // Função para fechar os submenus quando clicar fora do menu
    const productButtonRef: RefObject<HTMLButtonElement> = useRef(null);
    const categoriaButtonRef: RefObject<HTMLButtonElement> = useRef(null);

    const handleSubMenuClick = (index: any, isMenuSelected: any) => {
        if (index === 1 && isMenuSelected) {
          if (activeSubMenuCategory === index) {
                setActiveSubMenuCategory(null);
                setArrowRotationCategoria(!arrowRotationCategoria);
          } else {
                setActiveSubMenuCategory(index);
                setArrowRotationCategoria(!arrowRotationCategoria);
          }
          
        } else if(index === 2 && isMenuSelected) {
            if (activeSubMenuProduct === index) {
                setActiveSubMenuProduct(null);
                setArrowRotationProduct(!arrowRotationProduct);
            } else {
                setActiveSubMenuProduct(index);
                setArrowRotationProduct(!arrowRotationProduct);
            }
          }
    };

    // ESCONDER MENU CATEGORY AO CLICAR
    const handleOutsideClickCategory = (event: MouseEvent) => {
        if (
          categoriaButtonRef.current &&
          event.target &&
          !categoriaButtonRef.current.contains(event.target as Node)
        ) {
          setActiveSubMenuCategory(null);
          setArrowRotationCategoria(false);
        }
      };

      useEffect(() => {
        document.addEventListener('click', handleOutsideClickCategory);
        return () => {
          document.removeEventListener('click', handleOutsideClickCategory);
        };
      }, []);

      // ESCONDER MENU PRODUCT AO CLICAR
    const handleOutsideClickProduct = (event: MouseEvent) => {
        if (
          productButtonRef.current &&
          event.target &&
          !productButtonRef.current.contains(event.target as Node)
        ) {
          setActiveSubMenuProduct(null);
          setArrowRotationProduct(false);
        }
      };

      useEffect(() => {
        document.addEventListener('click', handleOutsideClickProduct);
        return () => {
          document.removeEventListener('click', handleOutsideClickProduct);
        };
      }, []);


    return (
        <Container>
                <Link href='/dashboard'>
                    <img src="/logo.svg" width={190} height={60} alt="" />
                </Link>

                {/* <h1>{user?.name}</h1> */}

                <NavHeader>
                  <div className='menuItem'>
                      <button
                          ref={categoriaButtonRef}
                          onClick={() => handleSubMenuClick(1, true)}
                          >Categoria
                          <FiChevronDown size={18} className={`${'arrow'} ${arrowRotationCategoria ? 'arrowRotate' : ''}`} />
                      </button>
                          {activeSubMenuCategory === 1 && (
                          <div className='submenu'>
                                <Link href='/category'>
                                  <p>Cadastrar</p>
                              </Link>
                              <Link href="/category/list">
                              <p>Listar todos</p>
                              </Link>
                          </div>
                          )} {/* Ícone de seta */}
                  </div>

                  <div className='menuItem'>
                      <button
                          ref={productButtonRef}
                          onClick={() => handleSubMenuClick(2, true)}
                          >Cardapio
                          <FiChevronDown size={18} className={`${'arrow'} ${arrowRotationProduct ? 'arrowRotate' : ''}`} />
                      </button>
                      
                          {activeSubMenuProduct === 2 && (
                          <div className='submenu'>
                              <Link href='/product'>
                                <p>Cadastrar</p>
                              </Link>
                              <Link href="/product/list">
                              <p>Listar todos</p>
                              </Link>
                          </div>
                          )} {/* Ícone de seta */}
                  </div>

                  <button onClick={signOut}>
                      <FiLogOut color="CCDBDC" />
                  </button>
                </NavHeader>
        </Container>
    )
}