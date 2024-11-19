import ProductService from "../services/products.service";

export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductService.getAllProducts();

        return res.status(200).json({
            status: 'success',
            message: 'All Products fetched',
            data: products
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductService.getProductById(id);

        return res.status(200).json({
            status: 'success',
            message: `Product with id ${id} fetched`,
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const formData = req.body;
        const newProduct = await ProductService.createProduct(formData);

        return res.status(201).json({
            status: 'success',
            message: 'Product created successfully',
            data: newProduct
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedProduct = await ProductService.updateProduct(id, updatedData);

        return res.status(200).json({
            status: 'success',
            message: `Product with id ${id} updated`,
            data: updatedProduct
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await ProductService.deleteProduct(id);

        return res.status(204).json({
            status: 'success',
            message: `Product with id ${id} deleted`
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
