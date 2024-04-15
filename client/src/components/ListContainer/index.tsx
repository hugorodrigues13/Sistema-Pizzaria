import React, { useState } from "react";
import { Container, Thead, Tbody, Table, TableContainer, TitleRow, LeftAlignedCell, RightAlignedCell, DataRow, Pagination, PrevButton, NextButton } from "./styles";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const data = [
    { id: 1, name: "Produto 1", action: "Ação 1" },
    { id: 2, name: "Produto 2", action: "Ação 2" },
    { id: 3, name: "Produto 3", action: "Ação 3" },
    { id: 4, name: "Produto 4", action: "Ação 4" },
    { id: 5, name: "Produto 5", action: "Ação 5" },
    { id: 6, name: "Produto 6", action: "Ação 6" },
    { id: 7, name: "Produto 7", action: "Ação 7" },
    { id: 8, name: "Produto 8", action: "Ação 8" },
    { id: 9, name: "Produto 9", action: "Ação 9" },
    { id: 10, name: "Produto 10", action: "Ação 10" },
    // Adicione mais dados conforme necessário
];

const ITEMS_PER_PAGE = 5;

export const ListContainer = () => {
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
                                <RightAlignedCell>-</RightAlignedCell>
                                <RightAlignedCell>{item.action}</RightAlignedCell>
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
