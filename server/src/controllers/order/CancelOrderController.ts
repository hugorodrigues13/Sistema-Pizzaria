import { Request, Response } from "express";
import { CancelOrderService } from "../../services/order/CancelOrderService";

class CancelOrderController{
    async handle(req: Request, res: Response) {
        const {order_id} = req.body;

        const cancelOrder = new CancelOrderService();

        const order = await cancelOrder.execute({
            order_id,
        })

        return res.json(order)
    }
}

export { CancelOrderController }