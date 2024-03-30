import styled from "styled-components";

export const Container = styled.main`
    max-width: 720px;
    margin: 4rem auto;
    padding: 0 2rem;

    display: flex;
    justify-content: space-between;
    flex-direction: column;

    h1 {
        color: ${ props => props.theme.colors.gray};
    }

    form{
        display: flex;
        flex-direction: column;
        margin: 1rem 0;

        textarea{
            width: 100%;
            min-height: 80px;
            resize: none;
            padding: 0.5rem;
        }

        select{
            width: 100%;
            height: 40px;
            border-radius: 0.3rem;
            margin-bottom: 1rem;
            color: ${props => props.theme.colors.gray};
            background-color: ${props => props.theme.colors.tertiary};
            border: none;
            padding: 0 0.5rem;
        }

        label {
            width: 100%;
            height: 240px;
            background-color: ${props => props.theme.colors.tertiary};
            margin-bottom: 1rem;
            border-radius: 0.3rem;
            border: 1px dashed ${props => props.theme.colors.gray};;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            input{
                display: none;
            }

            span{
                z-index: 99;
                position: absolute;
                opacity: 0.7;
                transition: all 0.5s;
            }

            span:hover{
                opacity: 1;
                transform: scale(1.2);
            }
        }

        .preview{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0.3rem;
        }

        .input{
            height: 40px;
            border-radius: 0.3rem;
            margin-bottom: 1rem;
            color: ${props => props.theme.colors.gray};
            background-color: ${props => props.theme.colors.tertiary};
            border: none;
            padding: 0.5rem;

            &::placeholder{
                color: ${props => props.theme.colors.gray};
            }
        }

        .buttonAdd{
            border-radius: 0.3rem;
            height: 40px;
            border: 0;
            background-color: ${props => props.theme.colors.success};
            font-size: 1.2rem;
            font-weight: bold;
            color: ${props => props.theme.colors.primary};
            transition: brightness 0.2s;

            &:hover{
                filter: brightness(1.08);
            }
        }
    }
`;