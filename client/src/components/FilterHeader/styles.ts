import styled from "styled-components";

interface TitleContainerProps {
    color: string;
}

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const TitleContainer = styled.div<TitleContainerProps>`
    color: ${props => props.theme.colors.gray};

    > p {
        font-size: 1.2rem;
    }

    &::after {
        content: '';
        display: block;
        margin: 5px 0 0 0;
        width: 50%;
        border-bottom: 5px solid ${props => props.color};
    }
`;

export const Controllers = styled.div`
    display: flex;
`;