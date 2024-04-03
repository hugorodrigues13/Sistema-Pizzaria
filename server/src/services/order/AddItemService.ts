import prismaClient from "../../../prisma";

interface ItemRequest {
    order_id: string;
    product_id: string;
    amount: number;
}

interface ItemResponse {
    success: boolean;
    message?: string;
    order?: any; // Defina o tipo de retorno conforme necessário
}

class AddItemService {
    async execute({ order_id, product_id, amount }: ItemRequest): Promise<ItemResponse> {
        try {
            // Verifica se o produto já está no pedido
            const existingItem = await prismaClient.item.findFirst({
                where: {
                    order_id,
                    product_id,
                },
            });

            if (existingItem) {
                // Se o item já existir, retorne uma mensagem de erro
                return { success: false, message: "Este produto já foi adicionado ao pedido." };
            }

            // Se o item não existir, crie-o
            const order = await prismaClient.item.create({
                data: {
                    order_id: order_id,
                    product_id: product_id,
                    amount,
                },
            });

            return { success: true, order };
        } catch (error) {
            // Se ocorrer um erro, retorne uma mensagem de erro
            return { success: false, message: "Erro ao adicionar item: " + error.message };
        }
    }
}

export { AddItemService };