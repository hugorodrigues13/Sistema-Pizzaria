import styled from "styled-components";

export const Container = styled.header`
    max-width: 1120px;
    height: 5rem;
    margin: 0 auto;
    padding: 0 2rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
        cursor: pointer;
        max-width: 100%;
        height: auto;
        transition: all 0.5s; /* Adicionando transição para suavizar a mudança */
    }

    @media screen and (max-width: 700px) {
        img {
            max-width: 80%; /* Reduzindo o tamanho da imagem para 80% da largura da tela */
        }
    }
`;

export const NavHeader = styled.nav`
    display: flex;
    align-items: center;

    button{
        display: flex;
        color: ${props => props.theme.colors.gray};
        background-color: transparent;
        align-items: center;
        border: 0;
        transition: transform 0.8s;

        >svg {
            margin-left: 2rem;
            font-size: 20px;
        }

        &:hover{
            transform: scale3d(1.2, 1.2, 1);
            color: ${props => props.theme.colors.white};
        }
    }

    .menuItem {
        position: relative;
        margin: 0 1rem;
    }

    .menuNav {
        color: ${props => props.theme.colors.gray};
        padding: 0 0.5rem;
        display: inline-block;
        position: relative;
        transition: color 0.5s;
    
        &:hover{
            color: ${props => props.theme.colors.info};
        }
    }

    .submenu {
        display: block;
        position: absolute;
        width: 120px;
        margin-top: 1rem;
        top: 100%;
        left: 0;
        border: solid 1px ${props => props.theme.colors.black};
        background-color: ${props => props.theme.colors.gray};
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        
        p {
            display: block;
            width: 100%;
            font-size: 0.9rem;
            padding: 0.5rem;
            color: ${props => props.theme.colors.primary};

            transition: transform 0.5s;

            &:hover{
                transform: scale3d(1.1, 1.1, 1)
            }
        }
    }

    .submenu::before {
        content: '';
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid ${props => props.theme.colors.gray};
    }

    .arrow {
    display: inline-block;
    margin-left: 0.3rem;
    transition: transform 0.3s;
    }
  
    .arrowRotate {
        transform: rotate(180deg);
    }

@media screen and (max-width: 700px) {
        p {
            font-size: 0.8rem; /* Reduzindo o tamanho da fonte */
        }

        button {
            font-size: 0.8rem;

            >svg {
            font-size: 1rem;
        }

     }

}
    
`;