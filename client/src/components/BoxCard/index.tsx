import React from "react";

import styles from './styles.module.scss'
import Image from "next/image";
import CountUp from "react-countup";

import canceladoImg from '@/assets/cancelado.svg';
import concluidoImg from '@/assets/concluido.svg';
import andamentoImg from '@/assets/em-andamento.svg';

interface IBoxCard {
    id: string;
    table: string;
    status: boolean;
    draft: boolean;
    name: string;
    icon: 'cancelado' | 'concluido' | 'andamento';
    color: string;
}

export const BoxCard = ({table, status, draft, name, icon, color}: IBoxCard) => {

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
        <div className={styles.container}>
            <span>{}</span>
        </div>
    )
}