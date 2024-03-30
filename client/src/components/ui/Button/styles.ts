import styled from "styled-components";

export const ButtonContainer = styled.button`
    max-width: 600px;
    background-color: ${props => props.theme.colors.black};
    border: 0;
    padding: 0.4rem;
    color: ${props => props.theme.colors.white};
    border-radius: 0.5rem;
    transition: filter 0.2s;

    &[disabled]{
        cursor: not-allowed;
        svg{
            animation: animate 2s infinite;
        }
    }

    &:hover{
        filter: brightness(1.15);
    }

    > span {
        color: ${props => props.theme.colors.white};
    }

    @keyframes animate {
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
    }
`;
