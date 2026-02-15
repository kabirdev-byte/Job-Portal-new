// import './config/instrument.js'
// import express from 'express';
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/db.js';
// import * as Sentry from "@sentry/node";
// import { clerkWebhooks } from './controllers/webhooks.js';


// // Initialize express

// const app = express()


// // connect to data base

// await connectDB()

// // middlewares

// app.use(cors())
// app.use(express.json())

// //Routes

// app.get('/', (req, res) => res.send('api working'))
// app.get("/debug-sentry", function mainHandler(req, res) {
//     throw new Error("My first Sentry error!");
// });

// app.post('/webhooks', clerkWebhooks)


// // port

// const PORT = process.env.PORT || 5000


// Sentry.init({ dsn: process.env.SENTRY_DSN });


// app.use(Sentry.Handlers.requestHandler()); // must come first
// // After all routes


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
    
// })


// app.use(Sentry.Handlers.errorHandler());


import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'


// Initialize Express
const app = express();

// Connect to database
await connectDB();
await connectCloudinary();


// 🔹 Sentry request handler MUST be first
app.use(Sentry.Handlers.requestHandler());


// middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());


// Routes
app.get("/", (req, res) => res.send("API working"));

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks", clerkWebhooks);
app.use('/api/company', companyRoutes );
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)

// 🔹 Sentry error handler MUST be after routes
app.use(Sentry.Handlers.errorHandler());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

