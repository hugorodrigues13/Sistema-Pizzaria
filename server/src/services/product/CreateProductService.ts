import prismaClient from "../../../prisma";

interface ProductRequest{
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}

class CreateProductService{
    async execute({name, price, description, banner, category_id}: ProductRequest){

        if(name === ''){
            throw new Error('Insira um nome para o produto')
        }else if(price === ''){
            throw new Error('Insira um preço')
        }
        else if(description === ''){
            throw new Error('Insira uma descrição')
        }
        else if(category_id === ''){
            throw new Error('Insira o id da categoria')
        }else{

            const product = await prismaClient.product.create({
                data:{
                    name: name, 
                    price: price, 
                    description: description, 
                    banner: banner, 
                    category_id: category_id,  
                }
            })
            return product;
        }
    }
}

export {CreateProductService}