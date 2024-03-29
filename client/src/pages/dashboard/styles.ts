import styled from "styled-components";

export const Container = styled.main`
    max-width: 1080px;
    margin: 4rem auto;
    padding: 0 2rem;

    display: flex;
    flex-direction: column;
    
    > h1 {
        color: ${props => props.theme.colors.gray};
    }
`;

export const Body = styled.div`
    background-color: ${props => props.theme.colors.tertiary};
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

    .emptyList{
        font-size: 1.2rem;
        color: ${props => props.theme.colors.gray};
    }

    .orderItem {
        display: flex;
        flex-direction: row;
        background-color: ${props => props.theme.colors.blue};
        margin-bottom: 1rem;
        align-items: center;
        border-radius: 12px;

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
