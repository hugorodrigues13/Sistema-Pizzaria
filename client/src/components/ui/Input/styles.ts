import styled from "styled-components";

import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

// Define os estilos dos componentes antes de importá-los
export const InputContainer = styled.input`
    margin-bottom: 1rem;
    height: 40px;
    border: 0;
    border-radius: 0.5rem;
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.white};
    padding: 1rem;
    border: 1px solid ${props => props.theme.colors.gray};

    &::placeholder{
        color: ${props => props.theme.colors.gray};
    }
`;

export const TextAreaContainer = styled.textarea`
    margin-bottom: 1rem;
    height: 40px;
    border: 0;
    border-radius: 0.5rem;
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.white};
    padding: 1rem;
    border: 1px solid ${props => props.theme.colors.gray};

    &::placeholder{
        color: ${props => props.theme.colors.gray};
    }
`;
