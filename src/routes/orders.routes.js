import express from 'express';
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from '../controllers/orders.controller';

const OrderRoutes = express.Router();

OrderRoutes.get('/', getAllOrders);
OrderRoutes.get('/:id', getOrderById);
OrderRoutes.post('/', createOrder);
OrderRoutes.put('/:id', updateOrder);
OrderRoutes.delete('/:id', deleteOrder);

export default OrderRoutes;