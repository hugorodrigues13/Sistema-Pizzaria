import styled from "styled-components";

export const Container = styled.main`
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 2rem;

    display: flex;
    flex-direction: column;
    
    > h1 {
        color: ${props => props.theme.colors.gray};
    }
`;

export const Card = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 1rem;
    margin: 2rem 0;
    border-radius: 12px;
    background-color: ${props => props.theme.colors.tertiary};
`;

export const Body = styled.div`
    background-color: ${props => props.theme.colors.tertiary};
    border-radius: 12px;
    padding: 1rem;
`;

export const HeaderContent = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;

    > button{
        background: transparent;
        border: 0;
        margin-left: 1rem;
    }

    > h1 {
        color: ${props => props.theme.colors.gray};
    }
`;

export const ListOrders = styled.article`
    display: flex;
    flex-direction: column;
    max-height: 380px;
    overflow-y: auto;

    scrollbar-width: thin; /* Firefox */
    scrollbar-color: ${props => props.theme.colors.tertiary} ${props => props.theme.colors.primary}; /* Firefox */

    /* Estilos para WebKit (Chrome, Safari) */
    &::-webkit-scrollbar {
        width: 10px;
        /* Largura da barra de rolagem */
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.blue}; /* Cor do polegar da barra de rolagem */
    }
    &::-webkit-scrollbar-track {
        background-color: ${props => props.theme.colors.primary}; /* Cor da trilha da barra de rolagem */
        border-radius: 12px; /* Raio de borda da trilha */
    }

    .emptyList{
        font-size: 1.2rem;
        color: ${props => props.theme.colors.gray};
    }

    .orderItem {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: ${props => props.theme.colors.blue};
        margin-bottom: 1rem;
        margin: 0 1rem 1rem 0;
        align-items: center;
        border-radius: 12px;
        padding-right: 0.5rem;

        > button{
            border: 0;
            background: transparent;
            font-size: 1.2rem;
            color: ${props => props.theme.colors.primary};
            height: 60px;
            align-items: center;
            display: flex;
        }
    }

    .tag{
        width: 9px;
        background-color: ${props => props.theme.colors.gray};
        height: 60px;
        border-radius: 12px 0 0 12px;
        margin-right: 1rem;
    }

`;
