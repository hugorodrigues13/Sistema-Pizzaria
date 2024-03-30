import styled from "styled-components";

export const Container = styled.div`
    width: 620px;
    background-color: ${props => props.theme.colors.gray};
    color: ${props => props.theme.colors.primary};

@media screen and (max-width: 700px){
        width: 430px;
}

@media screen and (max-width: 550px){
        width: 330px;
}
`;

export const HeaderContent = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .buttonClose{
        transition: transform 0.6s;

        &:hover{
            transform: scale(1.1);  
        }
    }

    .numberOrder {
        font-size: 1.4rem;
        color: ${props => props.theme.colors.tertiary};
    }

`;

export const Content = styled.div`
    display: flex;
    align-items: left;
    justify-content: center;
    flex-direction: column;
    padding: 1rem 0;

    > p {
        width: 65%;
        font-size: 1.5rem;
        color: ${props => props.theme.colors.tertiary};
        border-bottom: dashed 1px;
        margin-bottom: 1rem;
    }

    .scroll-container {
        width: 100%;
        height: 80px;
        margin: 1rem 0;
        border: 1px solid;
        border-radius: 0.5rem;
        padding: 0.5rem;
        text-align: start;
        color: ${props => props.theme.colors.primary};
        font-size: 1rem;
        overflow-y: auto;
        word-wrap: break-word;

        scrollbar-width: thin; /* Firefox */
        scrollbar-color: #C1C7C8 ${props => props.theme.colors.gray}; /* Firefox */
    }

`;

export const ListContent = styled.div`
        display: flex;
        max-height: 250px;
        flex-direction: column;
        overflow-y: auto;

        scrollbar-width: thin; /* Firefox */
        scrollbar-color: ${props => props.theme.colors.gray} #C1C7C8; /* Firefox */

        .containerItem{
            display: flex;
            flex-direction: column;
            margin-bottom: 1rem;

            strong{
                color: ${props => props.theme.colors.primary};
                font-size: 1.2rem;
            }
        }
`;

export const ButtonFooter = styled.footer`
        display: flex;
        justify-content: space-between;

        .buttonOrder {
            margin-top: 1.5rem;
            height: 30px;
            border: solid 1px;
            border-radius: 0.5rem;
            background-color: transparent;
            width: 160px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${props => props.theme.colors.primary};
            transition: transform 0.5s;

            font-weight: bold;

            &:hover{
                transform: scale(1.1);
            }
        }

        .buttonCancel {
            margin-top: 1.5rem;
            height: 30px;
            border: solid 1px;
            border-radius: 0.5rem;
            background-color: transparent;
            width: 160px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${props => props.theme.colors.info};
            transition: transform 0.5s;

            font-weight: bold;

            &:hover{
                transform: scale(1.1);
            }
        }

`;


