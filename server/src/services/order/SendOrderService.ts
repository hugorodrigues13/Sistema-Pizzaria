import prismaClient from "../../../prisma";

interface OrderRequest{
    order_id: string;
    name: string | null;
}

class SendOrderService{
    async execute({order_id, name}: OrderRequest){

          // Inclui o status na atualização, independentemente de ter um nome ou não
          const dataToUpdate: { draft: boolean; name?: string } = {
            draft: false,
        };

            if (name !== null) {
                // Se houver um nome, inclui-o na atualização
                dataToUpdate.name = name;
            }

        const order = await prismaClient.order.update({
            where: {
                id: order_id,
            },
            data: dataToUpdate
        })

        return order;
    }
}

export {SendOrderService}