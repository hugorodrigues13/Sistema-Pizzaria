import styled from "styled-components";

export const Container = styled.div`
    width: 620px;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.gray};

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
        color: ${props => props.theme.colors.success};
    }

`;

export const Content = styled.div`
    display: flex;
    align-items: left;
    justify-content: center;
    flex-direction: column;
    padding: 1rem 0;

    .headerTitle{
        display: flex;
        justify-content: space-between;
        border-bottom: dashed 1px;
        margin-bottom: 1rem;

        > p {
        font-size: 1.5rem;
        color: ${props => props.theme.colors.gray};
    }

    }

    .scroll-container {
        width: 100%;
        height: 80px;
        margin: 1rem 0;
        border: 1px solid;
        padding: 0.3rem;
        text-align: start;
        color: ${props => props.theme.colors.gray};
        font-size: 1rem;
        overflow-y: auto;
        word-wrap: break-word;

        scrollbar-width: thin; /* Firefox */
        scrollbar-color: ${props => props.theme.colors.secondary} ${props => props.theme.colors.tertiary}; /* Firefox */
    }

`;

export const ListContent = styled.div`
        display: flex;
        max-height: 250px;
        flex-direction: column;
        overflow-y: auto;

        scrollbar-width: thin; /* Firefox */
        scrollbar-color: ${props => props.theme.colors.secondary} ${props => props.theme.colors.tertiary};/* Firefox */

        .containerItem{
            display: flex;
            width: 100%;
            flex-direction: column;
            margin-bottom: 1rem;

            span{
                color: ${props => props.theme.colors.gray};
                font-size: 1.2rem;
                font-weight: bold;
                }

            strong{
                color: ${props => props.theme.colors.info};
                font-size: 1.2rem;
            }
        }
`;

export const ButtonFooter = styled.footer`
        display: flex;
        justify-content: space-between;

        button {
            margin-top: 1.5rem;
            height: 30px;
            border-radius: 0.5rem;
            background-color: transparent;
            width: 160px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            transition: transform 0.5s;

            &:hover{
                transform: scale(1.1);
            }
        }

        .buttonOrder {
            border: solid 1px;
            color: ${props => props.theme.colors.success};
        }

        .buttonCancel {
            border: 1px solid;
            color: ${props => props.theme.colors.info};
        }

`;


