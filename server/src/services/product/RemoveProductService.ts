import prismaClient from "../../../prisma";

interface ProductRequest {
    product_id: string;
}

class RemoveProductService {
    async execute({ product_id }: ProductRequest) {
        try {
            // Encontre todos os itens relacionados ao produto
            const items = await prismaClient.item.findMany({
                where: {
                    product_id: product_id,
                },
            });

            // Exclua os itens relacionados
            await Promise.all(items.map(async (item) => {
                await prismaClient.item.delete({
                    where: {
                        id: item.id,
                    },
                });
            }));

            // Agora que os itens estão excluídos, você pode excluir o produto
            const deletedProduct = await prismaClient.product.delete({
                where: {
                    id: product_id,
                },
            });

            return deletedProduct;
        } catch (error) {
            // Lidere com quaisquer erros aqui
            console.error("Erro ao excluir produto e itens associados:", error);
            throw error;
        }
    }
}

export { RemoveProductService };
