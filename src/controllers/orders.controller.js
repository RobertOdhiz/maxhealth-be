import OrderService from "../services/orders.service";

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderService.getAllOrders();
    return res.status(200).json({
      status: 'success',
      message: 'All orders fetched successfully',
      data: orders,
    });
  } catch (error) {
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
      return res.status(404).json({
        status: 'error',
        message: `Order with ID: ${id} not found`,
      });
    }
    return res.status(200).json({
      status: 'success',
      message: `Order with ID: ${id} fetched successfully`,
      data: order,
    });
  } catch (error) {
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

    return res.status(201).json({
      status: 'success',
      message: 'Order created successfully',
      data: newOrder,
    });
  } catch (error) {
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
      return res.status(404).json({
        status: 'error',
        message: `Order with ID: ${id} not found`,
      });
    }

    return res.status(200).json({
      status: 'success',
      message: `Order with ID: ${id} updated successfully`,
      data: updatedOrder,
    });
  } catch (error) {
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
      return res.status(404).json({
        status: 'error',
        message: `Order with ID: ${id} not found`,
      });
    }

    return res.status(204).json({
      status: 'success',
      message: `Order with ID: ${id} deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
