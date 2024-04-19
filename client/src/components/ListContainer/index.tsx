import React, { useState } from "react";
import { Container, Thead, Tbody, Table, TitleRow, LeftAlignedCell, RightAlignedCell, DataRow, Pagination, PrevButton, NextButton } from "./styles";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

    interface CategoryItemProps {
    id: string;
    name: string;
}

interface ListContainerProps {
    getCategoryProductStatus: (categoryId: string) => "SIM" | "NAO";
    data: CategoryItemProps[]; // Alteração: definindo o tipo de data como um array de CategoryItemProps
}

const ITEMS_PER_PAGE = 5;

export const ListContainer = ({ data, getCategoryProductStatus }: ListContainerProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

    const handleChangePage = (newPage: any) => {
        setCurrentPage(newPage);
    };

    const renderList = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const currentItems = data.slice(startIndex, endIndex);

        return (
            <Container>
                <Table>
                    <Thead>
                        <TitleRow>
                            <LeftAlignedCell>NOME</LeftAlignedCell>
                            <RightAlignedCell>PRODUTO</RightAlignedCell>
                            <RightAlignedCell>AÇÕES</RightAlignedCell>
                        </TitleRow>
                    </Thead>
                    <Tbody>
                        {currentItems.map((item, index) => (
                            <DataRow key={item.id} className={index % 2 === 0 ? "even" : "odd"}>
                                <LeftAlignedCell>{item.name}</LeftAlignedCell>
                                <RightAlignedCell><span>{getCategoryProductStatus(item.id)}</span></RightAlignedCell>
                                <RightAlignedCell>
                                    <FiTrash2 size={20} color="#FF3F4B"/>
                                </RightAlignedCell>
                            </DataRow>
                        ))}
                    </Tbody>
                </Table>
            <Pagination>
                <PrevButton
                    disabled={currentPage === 1}
                    onClick={() => handleChangePage(currentPage - 1)}
                >
                    <FiChevronLeft />
                </PrevButton>
                <span>{currentPage} de {totalPages}</span> {/* Mostrando o número da página atual e o número total de páginas */}
                <NextButton
                    disabled={currentPage === totalPages}
                    onClick={() => handleChangePage(currentPage + 1)}
                    >
                    <FiChevronRight />
                </NextButton>
            </Pagination>
        </Container>
        );
    };

    return renderList();
}
