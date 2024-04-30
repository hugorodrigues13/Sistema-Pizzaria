import { Request, Response } from "express";
import { UpdateProductService } from "../../services/product/UpdateProductService";

class UpdateProductController {
    async handle(req: Request, res: Response) {
        const {product_id, name, description, price, category_id} = req.body;
        const updateProduct = new UpdateProductService()

        if(!req.file){
            throw new Error("Insira um arquivo")
        }else{

            const {originalname, filename: banner} = req.file
 

        const product = await updateProduct.execute({
            product_id,
            name,
            price,
            description,
            banner,
            category_id,
        })

        return res.json(product)

    }
 }

}

export {UpdateProductController}