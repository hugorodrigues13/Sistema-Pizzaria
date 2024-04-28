import styled from "styled-components";

export const Container = styled.main`
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 2rem;

    display: flex;
    flex-direction: column;
    
    > h1 {
        color: ${props => props.theme.colors.gray};
    }
`;


