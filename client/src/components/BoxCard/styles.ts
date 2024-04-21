import styled from "styled-components";

interface IContainerProps {
    color: string;
}

export const Container = styled.main<IContainerProps>`
    width: 30%;
    height: 120px;
    border-radius: 12px;
    background-color: ${props => props.color};

    position: relative;
    overflow: hidden;

    > img {
        display: block;
        width: auto;
        height: 100%;
        position: absolute;
        top: 0px;
        right: 0;

        opacity: .5;
        pointer-events: none;
    }

    .cardItem{
        padding: 0.5rem;
        color: ${props => props.theme.colors.primary};
        > h1{
            display: flex;
            margin: 1rem 0;
            justify-content: center;
            align-items: center;
        }
    }

`;