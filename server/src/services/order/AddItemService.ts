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

            // Obter o preço do produto
            const product = await prismaClient.product.findUnique({
                where: { id: product_id },
            });

            if (!product) {
                return { success: false, message: "Produto não encontrado." };
            }

            // Calcular o preço total do item
            const productPrice = parseFloat(product.price.replace('R$', '').replace('.', '').replace(',', '.'));
            const totalPrice = (productPrice * amount).toFixed(2); // Converter para string formatada

            console.log(`Produto: ${product.name}, Preço Unitário: ${product.price}, Quantidade: ${amount}, Preço Total: ${totalPrice}`);

            // Se o item não existir, crie-o
            const order = await prismaClient.item.create({
                data: {
                    order_id: order_id,
                    product_id: product_id,
                    amount,
                    price: `R$ ${totalPrice.replace('.', ',')}`, // Adiciona o preço total do item como string formatada
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
