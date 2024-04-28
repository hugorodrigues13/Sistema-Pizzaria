import prismaClient from "../../../prisma";

class ListProductService {
    async execute() {
        const products = await prismaClient.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
                category: { // Incluir a categoria associada a cada produto
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        return products;
    }
}

export { ListProductService };
