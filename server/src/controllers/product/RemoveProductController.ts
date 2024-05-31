import { Request, Response } from "express";
import { RemoveProductService } from "../../services/product/RemoveProductService";

class RemoveProductController {
    async handle(req: Request, res: Response) {
        try {
            const product_id = req.query.product_id as string;

            const removeProductService = new RemoveProductService();

            // Chame o método execute do serviço para remover o produto
            const deletedProduct = await removeProductService.execute({ product_id });

            // Retorne o produto excluído como resposta
            return res.json(deletedProduct);
        } catch (error) {
            // Se ocorrer um erro, envie uma resposta de erro
            console.error("Erro ao excluir produto:", error);
            return res.status(500).json({ error: "Erro ao excluir produto" });
        }
    }
}

export { RemoveProductController };