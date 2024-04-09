import prismaClient from "../../../prisma";

interface OrderRequest{
    order_id: string;
}

class CancelOrderService{
    async execute({order_id}: OrderRequest){
        const order = await prismaClient.order.update({
            where: {
                id: order_id,
            },
            data: {
                draft: true,
                status: true,
            }
        })

        return order;
    }
}

export {CancelOrderService}