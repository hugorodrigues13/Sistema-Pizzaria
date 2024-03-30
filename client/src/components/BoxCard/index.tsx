import React from "react";
import Image from "next/image";

import { Container } from "./styles";
import CountUp from "react-countup";

import canceladoImg from '@/assets/cancelado.svg';
import concluidoImg from '@/assets/concluido.svg';
import andamentoImg from '@/assets/em-andamento.svg';

interface IBoxCard {
    table: string;
    name: string;
    icon: 'cancelado' | 'concluido' | 'andamento';
    color: string;
}

export const BoxCard = ({table, name, icon, color}: IBoxCard) => {

    const iconSelected = () => {
        switch (icon) {
            case 'cancelado':
                return canceladoImg;
            case 'concluido':
                return concluidoImg;
            case 'andamento':
                return andamentoImg;
            default: 
                return null;
        }
    }

    return (
        <Container color={color}>
                <div className="cardItem">
                    <h3>{name}</h3>
                    <h1>
                        {table}
                    </h1>
                </div>
            <Image src={iconSelected()} alt={name}  priority={true} />
        </Container>
    )
}