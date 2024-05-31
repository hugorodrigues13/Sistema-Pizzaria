import prismaClient from "../../../prisma";

interface OrderRequest {
  order_id: string;
  name: string | null;
  price: string;
}

class SendOrderService {
  async execute({ order_id, name }: OrderRequest) {
    const dataToUpdate: { draft: boolean; name?: string } = {
      draft: false,
    };

    if (name !== null) {
      dataToUpdate.name = name;
    }

    // Atualiza o pedido
    const order = await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: dataToUpdate,
    });

    // Calcula o novo preço do pedido
    const items = await prismaClient.item.findMany({
      where: {
        order_id: order_id,
      },
      include: {
        product: true,
      },
    });

    const totalPrice = items.reduce((acc, item) => {
        // Remover o símbolo "R$" e a vírgula do preço antes de converter para float
        const productPrice = parseFloat(item.product.price.replace("R$", "").replace(",", "."));
        if (!isNaN(productPrice)) {
            return acc + item.amount * productPrice;
        } else {
            console.error(`Invalid price for product ${item.product.id}: ${item.product.price}`);
            return acc;
        }
    }, 0);
    
    console.log("Total Price:", totalPrice);

    // Atualiza o preço do pedido
    const updatedOrder = await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        price: totalPrice.toFixed(2), // Converte o preço para string e formata com duas casas decimais
      },
    });

    return updatedOrder;
  }
}

export { SendOrderService };
