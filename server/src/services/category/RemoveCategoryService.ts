import prismaClient from "../../../prisma";

interface CategoryRequest{
    category_id: string
}

class RemoveCategoryService{
    async execute({category_id}: CategoryRequest){

        // Verifique se existem produtos vinculados a essa categoria
        const productsCount = await prismaClient.product.count({
            where: {
                category_id: category_id,
            },
        });

        // Se houver produtos vinculados, não exclua a categoria
        if (productsCount > 0) {
            throw new Error("Não é possível excluir uma categoria com produtos vinculados.");
        }

        // Se não houver produtos vinculados, exclua a categoria
        const deletedCategory = await prismaClient.category.delete({
            where: {
                id: category_id,
            },
        });

        return deletedCategory;
    }

}

export { RemoveCategoryService }