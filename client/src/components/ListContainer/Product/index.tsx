import React, { ReactNode, useState } from "react";
import { 
    Container, 
    Thead, 
    Tbody, 
    Table, 
    TitleRow, 
    LeftAlignedCell, 
    RightAlignedCell, 
    DataRow, 
    Pagination, 
    PrevButton, 
    NextButton,
    ModalDelete,
    SearchFilter
} from "../styles";

import formatCurrency from "@/utils/formatCurrency";

import { 
    FiChevronDown, 
    FiChevronLeft, 
    FiChevronRight, 
    FiChevronUp, 
    FiSearch, 
    FiEdit3, 
    FiTrash2,
    FiEdit
} from "react-icons/fi";
import { EditModal } from "../../ModalEdit/Product";

type ProductItem = {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
    category: {
        id: string;
        name: string;
    }
}

type Category = {
    id: string;
    name: string;
}

interface ListContainerProps {
    getDataStatus?: (id: string) => string;
    handleDeleteItem: (id: string) => void;
    handleEditClick: (product: ProductItem) => void
    data: ProductItem[];
    statusLabel?: string;
    setProducts: (updatedProducts: ProductItem[]) => void;
    categories: Category[];
    showEditModal: boolean;
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    editingProduct: ProductItem | null;
}

const ITEMS_PER_PAGE = 10;

export const ListContainer = ({ 
    data, 
    getDataStatus, 
    handleDeleteItem, 
    statusLabel, 
    handleEditClick, 
    setProducts, 
    categories, 
    showEditModal,
    setShowEditModal,
    editingProduct
 }: ListContainerProps) => {
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = data.slice(startIndex, endIndex);

    const [searchTerm, setSearchTerm] = useState<string>(""); // State para armazenar o termo de busca
    const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())); // Filtra os itens com base no termo de busca
    const filteredItems = searchTerm ? filteredData.slice(startIndex, endIndex) : currentItems;

    // ------------------------ FILTROS PELO NOME ------------------------------
    const toggleSortDirection = () => {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    };

    const sortedItems = filteredItems.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return sortDirection === "asc" ? -1 : 1;
        if (nameA > nameB) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    const handleChangePage = (newPage: any) => {
        setCurrentPage(newPage);
    };

    const handleConfirmDelete = () => {
        if (itemToDelete) {
            handleDeleteItem(itemToDelete);
            setItemToDelete(null);
            setShowConfirmation(false);
        }
    };

    const handleUpdateProduct = (updatedProducts: ProductItem[]) => {
        setProducts(updatedProducts);
    };

    return (
        <>
            <Container>
                <SearchFilter>
                    <div className="content-search">
                        <input
                            type="text"
                            placeholder="Pesquisar por nome"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {/* Adicionando o botão de pesquisa */}
                        <FiSearch size={25} onClick={() => setSearchTerm("")}/>
                    </div>
                </SearchFilter>
                <Table>
                    <Thead>
                        <TitleRow>
                            <LeftAlignedCell>
                                <button onClick={toggleSortDirection}>
                                    NOME 
                                    {sortDirection === "asc" 
                                    ? <div><FiChevronUp /> <FiChevronDown /></div>
                                    : <div><FiChevronUp /> <FiChevronDown /></div>}
                                </button>
                            </LeftAlignedCell>
                            <RightAlignedCell>{statusLabel}</RightAlignedCell>
                            <RightAlignedCell>PREÇO</RightAlignedCell>
                            <RightAlignedCell>AÇÕES</RightAlignedCell>
                        </TitleRow>
                    </Thead>
                    <Tbody>
                        {sortedItems.map((item, index) => (
                            <DataRow key={item.id} className={index % 2 === 0 ? "even" : "odd"}>
                                <LeftAlignedCell>{item.name}</LeftAlignedCell>
                                <RightAlignedCell>
                                    {getDataStatus && (
                                        <span className={getDataStatus(item.id)}>
                                            {item.category.name}
                                        </span>
                                    )}
                                </RightAlignedCell>
                                    <RightAlignedCell>
                                        <span>
                                            {formatCurrency(item.price)}
                                        </span>
                                    </RightAlignedCell>
                                <RightAlignedCell>
                                    {/* Adiciona um evento onClick para chamar handleEditClick */}
                                    <FiEdit 
                                        size={20}
                                        color="#3F3FFF"
                                        onClick={() => handleEditClick(item)} />
                                    <FiTrash2 
                                        size={20}   
                                        color="#FF3F4B"
                                        onClick={() => {
                                            setItemToDelete(item.id);
                                            setShowConfirmation(true);
                                        }}
                                    />
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
                {showConfirmation && (
                    <ModalDelete>
                        <div className="confirmation-modal">
                            <p>Deseja realmente excluir este item?</p>
                            <footer className="button-div">
                                <button className="button-confirm" onClick={handleConfirmDelete}>Confirmar</button>
                                <button className="button-cancel" onClick={() => setShowConfirmation(false)}>Cancelar</button>
                            </footer>
                        </div>
                    </ModalDelete>
                )}

                <EditModal
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    product={editingProduct}
                    categories={categories}
                    setProducts={handleUpdateProduct}
                    products={data}
                />
            </Container>
        </>
    );
};

