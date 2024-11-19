import Product from './products.model';
import Order from './orders.model';

export default function associateModels() {
  Product.hasMany(Order, {
    foreignKey: 'item',   
    as: 'orders',
  });

  Order.belongsTo(Product, {
    foreignKey: 'item',
    as: 'product',
  });
}
