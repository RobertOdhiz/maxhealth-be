import OrderService from "../services/orders.service";
import logger from '../utils/logger';

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderService.getAllOrders();
    logger.info("Fetched all orders successfully");
    
    return res.status(200).json({
      status: 'success',
      message: 'All orders fetched successfully',
      data: orders,
    });
  } catch (error) {
    logger.error(`Error fetching all orders: ${error.message}`);
    
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await OrderService.getOrderById(id);
    if (!order) {
      logger.warn(`Order with ID: ${id} not found`);
      
      return res.status(404).json({
        status: 'error',
        message: `Order with ID: ${id} not found`,
      });
    }
    
    logger.info(`Fetched order with ID: ${id} successfully`);
    
    return res.status(200).json({
      status: 'success',
      message: `Order with ID: ${id} fetched successfully`,
      data: order,
    });
  } catch (error) {
    logger.error(`Error fetching order with ID: ${id}: ${error.message}`);
    
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  const { name, phone, county, location, item, quantity, price, amount, note } = req.body;
  
  try {
    const newOrder = await OrderService.createOrder({
      name,
      phone,
      county,
      location,
      item,
      quantity,
      price,
      amount,
      note,
    });

    logger.info(`New order created: ${JSON.stringify(newOrder)}`);
    
    return res.status(201).json({
      status: 'success',
      message: 'Order created successfully',
      data: newOrder,
    });
  } catch (error) {
    logger.error(`Error creating order: ${error.message}`);
    
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Update an order by ID
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { name, phone, county, location, item, quantity, price, amount, note } = req.body;

  try {
    const updatedOrder = await OrderService.updateOrder(id, {
      name,
      phone,
      county,
      location,
      item,
      quantity,
      price,
      amount,
      note,
    });

    if (!updatedOrder) {
      logger.warn(`Order with ID: ${id} not found for update`);
      
      return res.status(404).json({
        status: 'error',
        message: `Order with ID: ${id} not found`,
      });
    }

    logger.info(`Order with ID: ${id} updated successfully`);
    
    return res.status(200).json({
      status: 'success',
      message: `Order with ID: ${id} updated successfully`,
      data: updatedOrder,
    });
  } catch (error) {
    logger.error(`Error updating order with ID: ${id}: ${error.message}`);
    
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Soft delete an order by ID
export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await OrderService.deleteOrder(id);

    if (!deletedOrder) {
      logger.warn(`Order with ID: ${id} not found for deletion`);
      
      return res.status(404).json({
        status: 'error',
        message: `Order with ID: ${id} not found`,
      });
    }

    logger.info(`Order with ID: ${id} deleted successfully`);
    
    return res.status(204).json({
      status: 'success',
      message: `Order with ID: ${id} deleted successfully`,
    });
  } catch (error) {
    logger.error(`Error deleting order with ID: ${id}: ${error.message}`);
    
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
