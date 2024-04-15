import styled from "styled-components";

export const Container = styled.main`
    width: 100%;
    background-color: ${props => props.theme.colors.white};
    margin: 0 auto;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const Thead = styled.thead`
    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.gray};
`;

export const Tbody = styled.tbody``;

export const TitleRow = styled.tr`
    height: 50px;
    font-weight: bold;
`;

export const DataRow = styled.tr`
    height: 40px;

    &.even {
        color: ${props => props.theme.colors.primary};
        background-color: ${props => props.theme.colors.listColor};
    }

    &.odd {
        color: ${props => props.theme.colors.primary};
        background-color: transparent
    }
`;

export const Cell = styled.td`
`;

export const Pagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: right;
    padding: 1rem;
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
`;

export const PrevButton = styled.button`
    display: flex;
    font-size: large;
    background-color: transparent;
    color: ${(props) => (props.disabled ? "#ccc" : props.theme.colors.primary)};
    border: none;
    cursor: pointer;

    transition: transform 0.2s;

    &:hover{
        transform: scale(1.1);
    }
`;

export const NextButton = styled.button`
    display: flex;
    font-size: large;
    background-color: transparent;
    color: ${(props) => (props.disabled ? "#ccc" : props.theme.colors.primary)};
    border: none;
    cursor: pointer;

    transition: transform 0.2s;

    &:hover{
        transform: scale(1.2);
    }
`;

// Componente Container da tabela
export const TableContainer = styled.div`
    width: 100%;

    overflow-x: auto;
`;

export const LeftAlignedCell = styled(Cell)`
    text-align: left;
    padding: 0 1rem;
    width: 60%;
`;

// Componente para alinhar o conteúdo das células à direita e ocupar 20% do width
export const RightAlignedCell = styled(Cell)`
    text-align: center;
    border-left: 1px solid #fff; /* Adiciona uma borda esquerda em todas as células */
    width: 10%;
`;