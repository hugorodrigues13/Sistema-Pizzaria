import styled from "styled-components";

export const Container = styled.header`
    max-width: 1120px;
    height: 5rem;
    margin: 0 auto;
    padding: 0 2rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    img{
        cursor: pointer;
    }
`;

export const NavHeader = styled.nav`
    display: flex;
    align-items: center;

    .menuNav {
        color: ${props => props.theme.colors.gray};
        padding: 0 0.5rem;
        display: inline-block;
        position: relative;
        margin-left: 2rem;
        transition: color 0.7s;
    
        &:hover{
            color: ${props => props.theme.colors.info};
        }
    }

    button{
        margin-left: 2rem;
        background-color: transparent;
        border: 0;
        transition: transform 0.6s;

        &:hover{
            transform: scale(1.2);
        }
    }
`;