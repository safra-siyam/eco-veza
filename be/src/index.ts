import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Route imports
import UserRoutes from './routes/UserRoutes';
import OrderRoutes from './routes/OrderRoutes';
import PaymentRoutes from './routes/PaymentRoutes';
import ItemRoutes from './routes/ItemRoutes';
import AuthRoutes from './routes/AuthRoutes';
import AdminRoutes from './routes/AdminRoutes';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Server port
const port = process.env.PORT || 3000;

// Allow cross-origin requests (CORS)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Middleware for cookie parsing
app.use(cookieParser());

// Custom middleware for logging requests
app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    console.log(`Request Method: ${req.method}`);
    console.log(`Headers: ${JSON.stringify(req.headers)}`);
    console.log(`Params: ${JSON.stringify(req.params)}`);
    console.log(`Body: ${JSON.stringify(req.body)}`);
    next();
});

// API routes
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/orders', OrderRoutes);
app.use('/api/v1/payment', PaymentRoutes);
app.use('/api/v1/items', ItemRoutes);
app.use('/api/v1/admin', AdminRoutes);

// Default route for health check or basic response
app.get('/', (req, res) => {
    res.send('Welcome to the Eco Veza API');
});

mongoose.connect(process.env.DB_CLUSTER || '', {
})
    .then(() => {
        // Start server if MongoDB connection is successful
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        // Log connection error
        console.error('Error connecting to MongoDB:', error);
    });
