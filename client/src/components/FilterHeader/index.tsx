import React, {ReactNode} from "react";
import {Container, TitleContainer, Controllers} from './styles'

interface ContentHeaderProps {
    title: string;
    lineColor: string;
    children: ReactNode;
}

export const FilterHeader = ({title, lineColor, children}: ContentHeaderProps) => {
    return(
        <Container>
            <TitleContainer color={lineColor}>
               <p>{title}</p>
            </TitleContainer>
            <Controllers>
                {children}
            </Controllers>
        </Container>
    )
}