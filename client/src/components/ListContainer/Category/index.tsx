import React, { ReactNode, useEffect, useState } from "react";
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
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiChevronUp, FiEdit, FiSearch } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { EditModalCategory } from "../../ModalEdit/Category";

interface CategoryItemProps {
    id: string;
    name: string;
}

interface ListContainerProps {
    getCategoryProductStatus: (categoryId: string) => "SIM" | "NAO";
    handleDeleteCategory: (categoryId: string) => void;
    handleEditClick: (product: CategoryItemProps) => void
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    updateCategoryList: (updatedCategory: CategoryItemProps[]) => void; 
    editingCategory: CategoryItemProps | null;
    showEditModal: boolean;
    data: CategoryItemProps[];
    children: ReactNode;
}

const ITEMS_PER_PAGE = 10;

export const ListContainer = ({ 
    children, 
    data, 
    getCategoryProductStatus, 
    handleDeleteCategory,
    handleEditClick,
    setShowEditModal,
    updateCategoryList,
    showEditModal,
    editingCategory
    }: ListContainerProps) => {
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>(""); 

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = data.slice(startIndex, endIndex);

    const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())); 
    const filteredItems = searchTerm ? filteredData.slice(startIndex, endIndex) : currentItems;

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
        if (categoryToDelete) {
            handleDeleteCategory(categoryToDelete);
            setCategoryToDelete(null);
            setShowConfirmation(false);
        }
    };

    return (
        <Container>
            <SearchFilter>
                <div className="content-search">
                    <input
                        type="text"
                        placeholder="Pesquisar por nome"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
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
                        <RightAlignedCell>{children}</RightAlignedCell>
                        <RightAlignedCell>AÇÕES</RightAlignedCell>
                    </TitleRow>
                </Thead>
                <Tbody>
                    {sortedItems.map((item, index) => (
                        <DataRow key={item.id} className={index % 2 === 0 ? "even" : "odd"}>
                            <LeftAlignedCell>{item.name}</LeftAlignedCell>
                            <RightAlignedCell>
                                <span className={getCategoryProductStatus(item.id) === "SIM" ? "sim" : "nao"}>
                                    {getCategoryProductStatus(item.id)}
                                </span>
                            </RightAlignedCell>
                            <RightAlignedCell>
                                <FiEdit 
                                    size={20} 
                                    color="#3F3FFF"
                                    onClick={() => {
                                        handleEditClick(item);
                                        setShowEditModal(true);
                                    }}
                                />
                                <FiTrash2 
                                    size={20} 
                                    color="#FF3F4B"
                                    onClick={() => {
                                        setCategoryToDelete(item.id);
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
                <span>{currentPage} de {totalPages}</span>
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
                        <p>Deseja realmente excluir esta categoria?</p>
                        <footer className="button-div">
                            <button className="button-confirm" onClick={handleConfirmDelete}>Confirmar</button>
                            <button className="button-cancel" onClick={() => setShowConfirmation(false)}>Cancelar</button>
                        </footer>
                    </div>
                </ModalDelete>
            )}
            <EditModalCategory 
                show={showEditModal} 
                handleClose={() => setShowEditModal(false)} 
                category={editingCategory} 
                updateCategoryList={updateCategoryList}
            />
        </Container>
    );
};
