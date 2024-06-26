import styled from "styled-components";

export const Container = styled.main`
    width: 620px;
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary};
    

@media screen and (max-width: 700px){
        width: 430px;
}

@media screen and (max-width: 550px){
        width: 330px;
}
`;

export const HeaderModal = styled.header`
    display: flex;
    justify-content: space-between;

    .border-bottom{
        font-size: 1.1rem;
        font-weight: bold;
        
        &::after {
        content: '';
        display: block;
        margin: 5px 0 0 0;
        width: 50%;
        border-bottom: 2px solid ${props => props.color};
    }
    }

    >svg {
        cursor: pointer;

        transition: transform 0.3s ease-in-out;

        &:hover{
            transform: scale(1.1);
        }
    }

`;

export const FormBody = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;

    img {
        margin: 1rem 0;
    }

    input {
        height: 40px;
        padding-left: 0.3rem;
        border: none;
        font-weight: bold;
        color: ${props => props.theme.colors.primary};
        border-bottom: 1px solid ${props => props.theme.colors.primary};
        margin-bottom: 1rem;

        &::placeholder{
            color: ${props => props.theme.colors.primary};;
        }
    }

    select{
        border: none;
        height: 40px;
        font-weight: bold;
        color: ${props => props.theme.colors.primary};
        border-bottom: 1px solid ${props => props.theme.colors.primary};
    }

    .text-area {
    margin-bottom: 4rem;
}

    .div-row {
        width: 100%;
        display: flex;
        justify-content: space-between;

        >select{
            width: 50%;
        }

        >input {
            width: 25%;
        }
    }

    .div-button {
        text-align: center; /* Centraliza o conteúdo horizontalmente */

        >button {
            width: 40%;
            margin: 0 auto;
            height: 40px;
            border-radius: 12px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: ${props => props.theme.colors.success};
            border: none;
            transition: transform 0.3s ease-in-out;

            &:hover{
                transform: scale(1.05);
            }
        }
    }
`;

export const ImgLabel = styled.label`
        width: 40%;
        height: 140px;
        background-color: ${props => props.theme.colors.white};
        margin-bottom: 1rem;
        border-radius: 0.3rem;
        border: 1px dashed ${props => props.theme.colors.primary};
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-top: 1rem;

        input {
            display: none;
        }

        span {
            z-index: 99;
            position: absolute;
            opacity: 0.7;
            transition: all 0.5s;
        }

        .preview{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0.3rem;
        }

`;