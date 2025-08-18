import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import connecToMongoDB from './db/connectToMongoDB';
import client from './redis/client';
import adminRoutes from './routes/admin.routes';

import userAuthRoutes from './routes/user.routes/auth.routes';
import userProfileRoutes from "./routes/user.routes/profile.routes";

import ngoAuthRoutes from "./routes/ngo.routes/auth.routes";

import govtAuthRoutes from "./routes/govt.routes/auth.routes";

const PORT = process.env.PORT || 3000;

const app = express();
const corsOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'PATCH',
        'OPTIONS'
    ],
    allowHeaders: [
        'Content-Type',
        'Authorization',
        'Accept'
    ],
    credentials: true
};

app.use(cors(corsOpts));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/v1', (req: Request, res: Response) => {
    res.send('Server Up & Running!');
});

// Admin routes
app.use('/api/v1/admin', adminRoutes);

// User routes
app.use('/api/v1/user/auth', userAuthRoutes);
app.use('/api/v1/user/profile', userProfileRoutes);

// NGO routes
app.use('/api/v1/ngo/auth', ngoAuthRoutes);

// Govt. routes
app.use('/api/v1/gov/auth', govtAuthRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on PORT: ${PORT}`);
    connecToMongoDB();

    if (client) {
        console.log("📦 Connected to Redis");
    } else {
        console.log("❌ Error in connecting to Redis");
    }
});