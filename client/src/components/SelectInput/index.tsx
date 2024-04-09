import React, {ReactNode} from 'react'

import {Container} from './styles'

interface SelectInputProps {
    options: {
        value: string | number;
        label: string | number;
    }[],

    onChange(event: React.ChangeEvent<HTMLSelectElement>): void | undefined;
    defaultValue?: string | number;
}

export const SelectInput = ({options, onChange, defaultValue}: SelectInputProps) => {
    return (
        <Container>
            <select onChange={onChange} defaultValue={defaultValue}>
                {
                    options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))
                }
            </select>
        </Container>
    )
}