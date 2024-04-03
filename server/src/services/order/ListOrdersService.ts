import prismaClient from "../../../prisma";


class ListOrdersService {
    async execute(){

        const orders = await prismaClient.order.findMany({
            where: {
                OR: [
                    { status: false, draft: false }, // Filtrando pedidos com status e draft false
                    { status: true, draft: true }, // Filtrando pedidos com status e draft true
                    { status: true, draft: false } // Filtrando pedidos com status true e draft false
                ]
            },
            orderBy: {
                created_at: 'desc'
            }
        })

        return orders

    }
}

export {ListOrdersService}