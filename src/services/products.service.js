import Product from "../database/models/products.model";

class ProductService {

    static async getAllProducts () {
        try {
            return await Product.findAll();
        } catch (error) {
            throw new Error('Error fetching products: ' + error.message);
        }
    }

    static async getProductById (id) {
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                throw new Error('Product Not Found');
            }
            return product;
        } catch (error) {
            throw new Error('Error fetching product: ' + error.message);
        }
    }

    static async createProduct (data) {
        return await Product.create(data);
    }

    static async updateProduct (id, updatedData) {
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                throw new Error('Product Not Found');
            }
            await product.update(updatedData);
            return product;
        } catch (error) {
            throw new Error('Error updating product: ' + error.message);
        }
    }

    static async deleteProduct (id) {
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                throw new Error('Product Not Found');
            }
            await product.destroy();
            return { message: 'Product successfully deleted' };
        } catch (error) {
            throw new Error('Error deleting product: ' + error.message);
        }
    }
}

export default ProductService;
