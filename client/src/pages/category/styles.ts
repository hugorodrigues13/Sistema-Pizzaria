import styled from "styled-components";

export const Container = styled.header`
    
`;

export const MainContent = styled.main`
    max-width: 720px;
    margin: 4rem auto;
    padding: 0 2rem;

    display: flex;
    justify-content: space-between;
    flex-direction: column;

    h1 {
        color: ${props => props.theme.colors.gray};
    }

    form {
        display: flex;
        flex-direction: column;
        margin: 1rem 0;

    }

    input {
        background-color: ${props => props.theme.colors.gray};
        border: 0;
        padding: 1rem;
        height: 40px;
        border-radius: 0.3rem;
        color: var(--white);
        border: 1px solid ${props => props.theme.colors.success};
        margin-bottom: 1rem;

    }

    button {
        height: 40px;
        border: 0;
        background-color: ${props => props.theme.colors.success};
        font-weight: bold;
        font-size: 1.2rem;
        border-radius: 0.3rem;
        color: ${props => props.theme.colors.primary};
        transition: brightness 0.2s;

        &:hover{
            filter: brightness(1.08);
        }
    }   

`;