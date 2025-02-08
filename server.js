import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { testConnection } from './src/database/config/database.config';
import ProductsRoute from './src/routes/products.routes';
import associateModels from './src/database/models/associationModels';
import OrderRoutes from './src/routes/orders.routes';
import "./src/utils/cron";

dotenv.config();

const PORT = process.env.PORT || 9000;
const app = express();

// Middleware setup
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// STATUS route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running!', status: 'OK', APIhealth: 'Good' });
});

associateModels();

app.use('/api/products', ProductsRoute);
app.use('/api/orders', OrderRoutes);

// Start the server
const startServer = async () => {
    try {
        await testConnection();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1);
    }
};

startServer();
