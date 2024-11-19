import Order from "../database/models/orders.model";
import Product from "../database/models/products.model";

class OrderService {
  static async createOrder(orderData) {
    try {
      const order = await Order.create(orderData);
      return order;
    } catch (error) {
      throw new Error('Error creating the order: ' + error.message);
    }
  }

  static async getAllOrders() {
    try {
      return await Order.findAll({
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['uuid', 'title', 'price', 'description', 'imageURL', 'discount', 'remainingItems']
          }
        ]
      });
    } catch (error) {
      throw new Error('Error fetching orders: ' + error.message);
    }
  }

  static async getOrderById(orderUuid) {
    try {
      const order = await Order.findOne({
        where: { uuid: orderUuid },
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['uuid', 'title', 'price', 'description', 'imageURL', 'discount', 'remainingItems']
          }
        ]
      });

      if (!order) {
        throw new Error('Order not found');
      }

      return order;
    } catch (error) {
      throw new Error('Error fetching the order: ' + error.message);
    }
  }

  static async updateOrder(orderUuid, updatedData) {
    try {
      const order = await Order.findOne({
        where: { uuid: orderUuid },
      });

      if (!order) {
        throw new Error('Order not found');
      }

      await order.update(updatedData);
      return order;
    } catch (error) {
      throw new Error('Error updating the order: ' + error.message);
    }
  }

  static async deleteOrder(orderUuid) {
    try {
      const order = await Order.findOne({
        where: { uuid: orderUuid },
      });

      if (!order) {
        throw new Error('Order not found');
      }

      await order.destroy();
      return { message: 'Order successfully deleted' };
    } catch (error) {
      throw new Error('Error deleting the order: ' + error.message);
    }
  }
}

export default OrderService;
