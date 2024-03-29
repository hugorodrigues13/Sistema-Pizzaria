import { ReactNode, ButtonHTMLAttributes } from 'react';
import { ButtonContainer } from './styles';

import {FaSpinner} from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
    children: ReactNode,
}

export function Button({loading, children, ...rest}: ButtonProps){
    return (
        <ButtonContainer
            disabled={loading}
            {...rest}
        >
            { loading ? (
                <FaSpinner color="#FFF" size={16}/>
            ) : (
                <span>{children}</span>
            )}
        </ButtonContainer>
    )

}