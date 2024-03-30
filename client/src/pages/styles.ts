import styled from "styled-components";

export const Container = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const Content = styled.main`
    margin-top: 2rem;
    width: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 2rem 1.5rem;

    h1{
        color: ${props => props.theme.colors.white};
        padding-bottom: 1rem;
    }

    form{
        width: 90%;
        display: flex;
        flex-direction: column;
    }

    form button{
        height: 40px;
        font-size: 1.2rem;
    }
`;

export const Text = styled.p`
    margin-top: 1rem;
    color: ${props => props.theme.colors.white};
    cursor: pointer;
`;