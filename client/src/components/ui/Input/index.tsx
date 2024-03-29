import { InputContainer, TextAreaContainer } from './styles'
import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function Input({...rest}: InputProps){
    return (
        <InputContainer {...rest}/>
    )
}

export function TextArea({...rest}: TextAreaProps){
    return (
        <TextAreaContainer {...rest}></TextAreaContainer>
    )
}