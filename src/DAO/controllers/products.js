import  productModel  from "../models/products.js"

class Product {

    constructor() {
        
    }

    async getAll(){
        return await productModel.find();
    }

    async getById(id){
        return await productModel.findById(id);
    }

    async create(data) {
        return await productModel.create(data)
    }


    async delete(id){
        return await productModel.findByIdAndDelete(id);
    }
}

export default new Product();
