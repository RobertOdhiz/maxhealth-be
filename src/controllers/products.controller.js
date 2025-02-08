import ProductService from "../services/products.service";
import logger from "../utils/logger";

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductService.getAllProducts();
        logger.info("Fetched all products successfully");

        return res.status(200).json({
            status: 'success',
            message: 'All Products fetched',
            data: products
        });
    } catch (error) {
        logger.error(`Error fetching all products: ${error.message}`);

        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductService.getProductById(id);

        if (!product) {
            logger.warn(`Product with ID: ${id} not found`);
            
            return res.status(404).json({
                status: 'error',
                message: `Product with ID: ${id} not found`
            });
        }

        logger.info(`Fetched product with ID: ${id} successfully`);

        return res.status(200).json({
            status: 'success',
            message: `Product with ID: ${id} fetched`,
            data: product
        });
    } catch (error) {
        logger.error(`Error fetching product with ID: ${id}: ${error.message}`);

        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const formData = req.body;
        const newProduct = await ProductService.createProduct(formData);

        logger.info(`New product created: ${JSON.stringify(newProduct)}`);

        return res.status(201).json({
            status: 'success',
            message: 'Product created successfully',
            data: newProduct
        });
    } catch (error) {
        logger.error(`Error creating product: ${error.message}`);

        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update an existing product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedProduct = await ProductService.updateProduct(id, updatedData);

        if (!updatedProduct) {
            logger.warn(`Product with ID: ${id} not found for update`);

            return res.status(404).json({
                status: 'error',
                message: `Product with ID: ${id} not found`
            });
        }

        logger.info(`Product with ID: ${id} updated successfully`);

        return res.status(200).json({
            status: 'success',
            message: `Product with ID: ${id} updated`,
            data: updatedProduct
        });
    } catch (error) {
        logger.error(`Error updating product with ID: ${id}: ${error.message}`);

        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await ProductService.deleteProduct(id);

        if (!deletedProduct) {
            logger.warn(`Product with ID: ${id} not found for deletion`);

            return res.status(404).json({
                status: 'error',
                message: `Product with ID: ${id} not found`
            });
        }

        logger.info(`Product with ID: ${id} deleted successfully`);

        return res.status(204).json({
            status: 'success',
            message: `Product with ID: ${id} deleted`
        });
    } catch (error) {
        logger.error(`Error deleting product with ID: ${id}: ${error.message}`);

        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
