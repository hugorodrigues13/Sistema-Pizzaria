import styled from "styled-components";

export const Container = styled.main`
    width: 100%;
    margin: 0 auto;

`;

export const Table = styled.table`
    width: 100%;
    background-color: ${props => props.theme.colors.white};
    border-collapse: collapse;

 @media screen and (max-width: 700px) {
        td {
            font-size: 0.8rem; /* Reduzindo o tamanho da fonte */
        }

        button{
            font-size: 0.8rem;
        }
    }
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

export const Cell = styled.td``;

export const Pagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: right;
    padding: 1rem;
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.white};
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

    button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: transparent;
        border: none;
        color: ${props => props.theme.colors.gray};
        font-weight: bold;

        div {
            display: flex;
            margin-left: 0.5rem;
            flex-direction: column;
        };
    }
`;

// Componente para alinhar o conteúdo das células à direita e ocupar 20% do width
export const RightAlignedCell = styled(Cell)`
    text-align: center;
    border-left: 1px solid #fff; /* Adiciona uma borda esquerda em todas as células */
    width: 10%;

    button {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        border: none;
        color: ${props => props.theme.colors.gray};
        font-weight: bold;

        div {
            display: flex;
            margin-left: 0.5rem;
            flex-direction: column;
        };
    }

    .sim {
        font-size: 1.1rem;
        color: ${(props) => props.theme.colors.primary}; /* Estilo para "SIM" */
    }

    .nao {
        font-size: 1.0rem;
        color: red; /* Estilo para "NAO" */
    }

    >svg {
        cursor: pointer;
        transition: transform 0.5s;

        &:hover{
            transform: scale3d(1.2, 1.2, 1)
        }
    }
`;

export const ModalDelete = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    .confirmation-modal {
        width: 30%;
        min-width: 300px;
        background-color: ${props => props.theme.colors.primary};
        height: 120px;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
    }

    .confirmation-modal p {
        color: ${props => props.theme.colors.white};
        margin-bottom: 10px;
    }

    .button-div  {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;

        button {
            width: 30%;
            height: 30px;
            border: none;
            border-radius: 0.5rem;
            color: ${props => props.theme.colors.primary};
            margin-top: auto; /* Faz o botão ficar na parte inferior */
            transition: transform 0.5s;

            &:hover{
                transform: scale(1.1);
            }
        }
    }

    .button-confirm {
        background-color: ${props => props.theme.colors.success};
    }

    .button-cancel {
        background-color: ${props => props.theme.colors.info};
    }
`;

export const SearchFilter = styled.div`
    margin-bottom: 2rem;

    .content-search {
        display: flex;
        height: 40px;
        width: 30%;
        justify-content: space-between;
        background-color: ${props => props.theme.colors.primary};
        border: solid 1px ${props => props.theme.colors.gray};

        input{
            width: 100%;
            padding: 0 0.5rem;
            color: ${props => props.theme.colors.gray};
            background-color: transparent;
            border: none;
        }

        input::placeholder {
            color: ${props => props.theme.colors.gray};
        }

        >svg {
            display: flex;
            height: 40px;
            margin-right: 0.5rem;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: ${props => props.theme.colors.gray};
        }
    }
    
`;